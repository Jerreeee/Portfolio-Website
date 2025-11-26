import maya.cmds as cmds
from functools import partial
import types


class ReferencePlaneSetup(object):
    def __init__(self, window_width, window_height):
        print("--------------------------------------")
        print("-------------Begin Script-------------")
        # CONSTANTS
        self.MAX_IMAGES = 6
        self.IMAGE_PATH_INDEX = 0
        self.IMAGE_NAME_INDEX = 1
        self.IMAGE_RL_INDEX = 2
        self.IMAGE_COLLECTION_INDEX = 3
        self.IMAGE_VIEW_INDEX = 4
        self.IMAGE_PLANE_INDEX = 5
        self.IMAGE_MATERIAL_INDEX = 6
        self.IMAGE_LOCATOR_INDEX = 7
        self.IMAGE_SCALING_INDEX = 8
        self.IMAGE_FLIP_HV_INDEX = 9
        self.VIEW_OPTIONS = [["Not_Assigned", "N/A"], ["Front", "F"], ["Back", "Ba"], ["Left", "L"],
                             ["Right", "R"], ["Top", "T"], ["Bottom", "Bo"]]
        self.NURBS_SQUARE_SIZE = 50  # in cm
        self.BASE_SCALE = 100  # in cm

        # Variables
        self.images = []
        # images list structure: [path to image on disk, image name, path to rowlayout,
        #                         path to collection, active view,
        #                         [image plane transform, image plane shape, scriptJob for deleting plane],
        #                         [material name, shading group name, texture name], [locator transform, locator shape],
        #                         [scaling in x, scaling in y], [flipped horizontally, flipped vertically]]
        self.selected_image_index = 0
        self.view_radio_button_collections = []
        self.reference_group = ""
        self.dimensions = [1.0, 1.0, 1.0]
        self.real_scale = [-1.0, -1.0, -1.0]
        self.use_real_scale = False
        self.set_camera_to_view = False
        self.radius = 1
        self.activate_options = False
        self.working_units_scalar = 1
        # self.working_units_scalar = self.check_working_units()

        # Run script if selection in the outliner changed
        self.script_job = cmds.scriptJob(event=['SelectionChanged', self.is_image_selected_in_outLiner])

        # UI constants
        self.BUTTON_BGC = [0.4, 0.4, 0.4]
        self.DARK_GREY = [0.2, 0.2, 0.2]
        # create UI
        self.window = cmds.window(title="ReferencePlaneSetup", w=window_width, h=window_height, cc=self.end_script)
        self.root = cmds.formLayout(p=self.window)
        self.info_root = cmds.formLayout(p=self.window, bgc=self.DARK_GREY, m=False)
        self.create_info_layout(window_width)
        self.ui_root = cmds.frameLayout(p=self.window, l="Show/Hide", cll=True, cl=False,
                                        pcc=self.hide_all_ui)
        self.canvas = cmds.formLayout(p=self.ui_root)
        self.import_shelf = self.create_import_shelf()
        self.image_layout, self.image_list, self.view_options_layout = self.create_image_layout()
        self.mirror_delete_layout = self.mirror_delete_layout()
        self.real_scale_layout = self.real_scale_layout()
        self.match_images_layout = self.match_images_layout()
        self.options_tabs, self.radius_slider, self.scale_slider, \
        self.ambient_color, self.flip_h, self.flip_v, self.scaling_text, self.scaling_text_info = self.options_layout()

        cmds.showWindow()

    # Methods to create the ui

    def create_info_layout(self, width):
        cmds.formLayout(self.root, e=True,
                        af=[
                            (self.info_root, "left", 0),
                            (self.info_root, "right", 0),
                            (self.info_root, "top", 0),
                        ],
                        an=[(self.info_root, "bottom")])
        column = cmds.columnLayout(p=self.info_root)
        cmds.text(p=column, ww=True, al="left", w=width, h=100,
                  l="1: Import up to 6 images. 2: Assign every image to it's proper view.   "
                    "3: !!! EVERY IMAGE HAS A NURBS SQUARE ATTACHED TO IT. SCALE IT UNTIL IT"
                    " PERFECTLY ENCLOSES YOUR OBJECT !!! .          4: Optional: add the real life scale "
                    "of your object in meters. The script will scale the reference images accordingly. "
                    "5: Click 'Match Images' and the script will do the rest")
        cmds.text(p=column, ww=True, al="left", w=width, h=100,
                  l="!!! Very important!!! The first image in the stack and the next image that is not"
                    " the opposite view of the first image, will have perfect scaling."
                    " These 2 images decide what the dimensions for your object will be."
                    " It is best practice to make these your primary reference images."
                    " All other images will be scaled to fit these 2"
                    " If there are perspective mistakes in the image the scaling will be "
                    " non-uniformly.")

        cmds.text(p=column, ww=True, al="left", w=width, h=100,
                  l=" This script will take into account the working unit. All images are by default placed "
                    "at a 1m offset from the origin. This script will not work with angular working unit "
                    "set to radians")
        return

    def create_import_shelf(self):
        cmds.formLayout(self.root, e=True,
                        af=[
                            (self.ui_root, "left", 0),
                            (self.ui_root, "right", 0)
                        ],
                        ac=[(self.ui_root, "top", 0, self.info_root)],
                        an=[(self.ui_root, "bottom")])
        height = 25
        import_shelf = cmds.flowLayout(p=self.canvas)
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (import_shelf, "top", 0),
                            (import_shelf, "left", 0),
                            (import_shelf, "right", 0)
                        ],
                        an=[
                            (import_shelf, "bottom")
                        ])
        cmds.button(p=import_shelf, l="import", w=50, h=height, bgc=self.BUTTON_BGC, c=self.import_images)
        cmds.checkBox(p=import_shelf, l="Help Info", h=height, cc=self.update_info_tab)
        return import_shelf

    def create_image_layout(self):
        image_layout = cmds.formLayout(p=self.canvas, bgc=self.DARK_GREY)
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (image_layout, "left", 0),
                            (image_layout, "right", 0)
                        ],
                        ac=[
                            (image_layout, "top", 0, self.import_shelf)
                        ],
                        an=[
                            (image_layout, "bottom")
                        ])
        image_list = cmds.textScrollList(p=image_layout, w=100, h=94, sc=self.set_selected_image,
                                         dkc=partial(self.delete_image, ignore=False, custom_index=-10))
        cmds.formLayout(image_layout, e=True,
                        af=[
                            (image_list, "top", 0),
                            (image_list, "left", 0),
                            (image_list, "bottom", 0),
                            (image_list, "right", 240)
                        ])
        view_options_layout = cmds.columnLayout(p=image_layout)
        cmds.formLayout(image_layout, e=True,
                        af=[
                            (view_options_layout, "top", 0),
                            (view_options_layout, "right", 0),
                            (view_options_layout, "bottom", 0)
                        ],
                        ac=[(view_options_layout, "left", 0, image_list)])
        return image_layout, image_list, view_options_layout

    def mirror_delete_layout(self):
        mirror_delete_layout = cmds.flowLayout(p=self.canvas)
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (mirror_delete_layout, "left", 0),
                            (mirror_delete_layout, "right", 0),
                        ],
                        ac=[(mirror_delete_layout, "top", 0, self.image_layout)],
                        an=[(mirror_delete_layout, "bottom")])
        cmds.button(p=mirror_delete_layout, l="mirror", h=15, w=50, bgc=self.BUTTON_BGC, c=self.mirror_image, en=False)
        cmds.button(p=mirror_delete_layout, l="delete", h=15, w=50, bgc=self.BUTTON_BGC, c=self.delete_image, en=False)
        return mirror_delete_layout

    def real_scale_layout(self):
        height = 20
        real_scale_layout = cmds.flowLayout(p=self.canvas, bgc=[0.2, 0.2, 0.2])
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (real_scale_layout, "left", 0),
                            (real_scale_layout, "right", 0),
                        ],
                        ac=[(real_scale_layout, "top", 0, self.mirror_delete_layout)],
                        an=[(real_scale_layout, "bottom")])
        real_scale = cmds.floatFieldGrp(p=real_scale_layout, l="Real Life Scale (m)", nf=3, cw4=[100, 50, 50, 50],
                                        cal=[1, "left"], h=height, en=False,
                                        v1=-1, v2=-1, v3=-1, ann="(width, height, length), if a value = -1 then "
                                                                 "this axis will not be taken into account")
        cmds.floatFieldGrp(real_scale, e=True, cc=partial(self.update_real_scale, real_scale))
        cmds.checkBox(p=real_scale_layout, l="use", v=False, h=height, cc=self.update_use_real_scale, en=False,
                      ann="When checked the images will be resized to fit the Real Lfe Scale value ")
        return real_scale_layout

    def match_images_layout(self):
        height = 25
        match_images_layout = cmds.flowLayout(p=self.canvas, bgc=[0.2, 0.2, 0.2])
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (match_images_layout, "left", 0),
                            (match_images_layout, "right", 0),
                        ],
                        ac=[(match_images_layout, "top", 10, self.real_scale_layout)],
                        an=[(match_images_layout, "bottom")])
        cmds.button(p=match_images_layout, l="match images", h=height, w=100, bgc=self.BUTTON_BGC, c=self.match_images,
                    en=False)
        return match_images_layout

    def options_layout(self):
        options_tabs = cmds.tabLayout(p=self.canvas, h=150, bgc=self.DARK_GREY, scr=True)
        cmds.formLayout(self.canvas, e=True,
                        af=[
                            (options_tabs, "left", 0),
                            (options_tabs, "right", 0),
                        ],
                        ac=[(options_tabs, "top", 20, self.match_images_layout)],
                        an=[(options_tabs, "bottom")])
        general_tab = cmds.formLayout(p=options_tabs, bgc=self.DARK_GREY, en=False)
        cmds.tabLayout(options_tabs, e=True, tl=[general_tab, "General"])
        specific_tab = cmds.formLayout(p=options_tabs, bgc=self.DARK_GREY, en=False)
        cmds.tabLayout(options_tabs, e=True, tl=[specific_tab, "Specific"])
        radius_slider, scale_slider = self.general_options(general_tab)
        ambient_color, flip_h, flip_v, scaling_text, scaling_text_info = self.specific_options(specific_tab)
        return options_tabs, radius_slider, scale_slider, ambient_color, flip_h, flip_v, scaling_text, scaling_text_info

    def general_options(self, parent):
        height = 20
        column_width = 50
        label = cmds.columnLayout(p=parent)
        cmds.formLayout(parent, e=True,
                        af=[
                            (label, "left", 0),
                            (label, "top", 0)
                        ],
                        an=[
                            (label, "right"),
                            (label, "bottom")
                        ])
        value = cmds.columnLayout(p=parent)
        cmds.formLayout(parent, e=True,
                        af=[
                            (value, "right", 0),
                            (value, "top", 0),
                        ],
                        ac=[(value, "left", 0, label)],
                        aoc=[(value, "bottom", 0, label)])
        # all labels
        # cmds.text("Object Scale", p=label, al="left", h=height, ann="The real life scale of the object in meters")
        # cmds.text("Set Camera To View", p=label, al="left", h=height)
        cmds.text(l="Display Textures", p=label, al="left", h=height)
        cmds.text(l="Freeze Images", p=label, al="left", h=height)
        cmds.text(l="Backface Culling", p=label, al="left", h=height)
        cmds.text(l="Radius", p=label, al="left", h=height)
        cmds.text(l="Scale", p=label, al="left", h=height)
        cmds.text(l="Transparency", p=label, al="left", h=height)

        # # all matching values for the labels
        # # cmds.floatFieldGrp(p=value, nf=3, h=height, v=[1, 1, 1, 1], cw3=[column_width, column_width, column_width])
        # cmds.checkBox(p=value, l="", cc=self.update_set_camera_to_view, h=height, v=False)
        cmds.checkBox(p=value, l="", cc=self.display_textures, h=height, v=True)
        self.display_textures("True", "True")
        cmds.checkBox(p=value, l="", cc=self.freeze_images, h=height)
        cmds.checkBox(p=value, l="", cc=self.set_backface_culling, h=height)
        radius_slider = cmds.floatSliderGrp(p=value, field=True, min=0.01, max=10,
                                            cw=[(1, column_width), (2, column_width * 3)],
                                            cal=[1, "left"], v=1)
        cmds.floatSliderGrp(radius_slider, e=True, dc=partial(self.update_radius, slider=radius_slider),
                            cc=partial(self.update_radius, slider=radius_slider))
        scale_slider = cmds.floatSliderGrp(p=value, field=True, min=0.1, max=10,
                                           cw=[(1, column_width), (2, column_width * 3)], cal=[1, "left"],
                                           v=1)
        cmds.floatSliderGrp(scale_slider, e=True, dc=partial(self.update_scale, slider=scale_slider),
                            cc=partial(self.update_scale, slider=scale_slider))
        transparency_slider = cmds.colorSliderGrp(p=value, cw=[(1, column_width), (2, column_width * 3)],
                                                  cal=[1, "left"], rgb=[0, 0, 0])
        cmds.colorSliderGrp(transparency_slider, e=True,
                            dc=partial(self.update_transparency, slider=transparency_slider),
                            cc=partial(self.update_transparency, slider=transparency_slider))
        return radius_slider, scale_slider

    def specific_options(self, parent):
        height = 20
        column_width = 50
        label = cmds.columnLayout(p=parent)
        cmds.formLayout(parent, e=True,
                        af=[
                            (label, "left", 0),
                            (label, "top", 0)
                        ],
                        an=[
                            (label, "right"),
                            (label, "bottom")
                        ])
        value = cmds.columnLayout(p=parent)
        cmds.formLayout(parent, e=True,
                        af=[
                            (value, "right", 0),
                            (value, "top", 0),
                        ],
                        ac=[(value, "left", 0, label)],
                        aoc=[(value, "bottom", 0, label)])
        cmds.text(l="Ambient Color", p=label, al="left", h=height)
        cmds.text(l="Flip Horizontal", p=label, al="left", h=height)
        cmds.text(l="Flip Vertical", p=label, al="left", h=height)
        cmds.text(l="Scaling", p=label, al="left", h=height)

        ambient_color = cmds.attrColorSliderGrp(p=value, l="", cw=[(1, 0), (2, column_width), (3, column_width * 3)],
                                                rgb=[0, 0, 0])
        flip_h = cmds.checkBox(p=value, l="", h=height, v=False)
        cmds.checkBox(flip_h, e=True, cc=partial(self.update_flip_hv, check_box=flip_h, hv="h"))
        flip_v = cmds.checkBox(p=value, l="", h=height, v=False)
        cmds.checkBox(flip_v, e=True, cc=partial(self.update_flip_hv, check_box=flip_v, hv="v"))
        scaling_text = cmds.text(l="[1, 1, 1]", p=value, al="left", h=height)
        scaling_text_info = cmds.text(l="", p=value, al="left", h=height)
        return ambient_color, flip_h, flip_v, scaling_text, scaling_text_info

    # Methods for ui interaction

    def hide_all_ui(self):
        cmds.formLayout(self.canvas, e=True, m=False)

    def update_info_tab(self, checked):
        if checked:
            cmds.formLayout(self.info_root, e=True, m=True)
            cmds.window(self.window, e=True, )
        else:
            cmds.formLayout(self.info_root, e=True, m=False)

    def activate_deactivate_ui(self, layouts, activate):
        """
        Method that enables or disables all children from a specified parent layout
        :param layouts: list, with all the ui layouts to change the children from
        :param activate: bool, set ui element enable flag to true or false
        :return: nothing
        """
        elements = []
        children = []
        # add all children from all the layouts to children[]
        for layout in layouts:
            name = self.get_name_from_path(layout, "|")
            # got the method for removing numbers from a string from the link below
            # https://stackoverflow.com/questions/12851791/removing-numbers-from-string
            name = ''.join([i for i in name[1] if not i.isdigit()])
            if name == "flowLayout":
                elements.append(cmds.flowLayout(layout, q=True, ca=True))
            elif name == "tabLayout":
                elements.append(cmds.tabLayout(layout, q=True, ca=True))

        for i in elements:
            for j in i:
                children.append(j)

        # enable or disable the enable flag for every ui element
        for child in children:
            if child.find("button") != -1:
                cmds.button(child, e=True, en=activate)
            elif child.find("formLayout") != -1:
                cmds.formLayout(child, e=True, en=activate)
            elif child.find("floatFieldGrp") != -1:
                cmds.floatFieldGrp(child, e=True, en=activate)
            elif child.find("checkBox") != -1:
                cmds.checkBox(child, e=True, en=activate)
            elif child.find("text") != -1:
                # cmds.text(child, e=True, en=True)
                pass

    def update_view_options(self, ignore, active_row, active_collection="empty"):
        """
        Method that checks if there are any duplicate view options, if so set the first 1 to "Not Assigned"
        :param ignore: ignore
        :param active_row: string, path to the row layout ui element
        :param active_collection: string, path to the collection containing all the radio buttons
        :return: nothing
        """
        content = cmds.columnLayout(self.view_options_layout, q=True, ca=True)
        row_name = self.get_name_from_path(active_row, "|")
        row_index = self.get_row_index(content, row_name[1])
        self.set_selected_image(row_index)
        active_button = cmds.radioCollection(active_collection, q=True, sl=True)
        self.images[self.selected_image_index][self.IMAGE_VIEW_INDEX] = active_button
        self.place_image(self.images[self.selected_image_index])

        # only do this if the radio button just activated is not the "N/A" radio button
        if len(self.images) > 1 and active_button != self.VIEW_OPTIONS[0][0]:
            # looop through all other images and check if any image is assigned to the same view
            # ifso assign this view to "N/A"
            for other_image in self.images:
                other_collection = other_image[self.IMAGE_COLLECTION_INDEX]
                if other_collection != active_collection and active_collection != "empty":
                    other_button = cmds.radioCollection(other_image[self.IMAGE_COLLECTION_INDEX], q=True, sl=True)
                    if active_button == other_button:
                        path = other_image[self.IMAGE_RL_INDEX] + "|" + self.VIEW_OPTIONS[0][0]
                        cmds.radioButton(path, e=True, sl=True)
                        other_image[self.IMAGE_VIEW_INDEX] = self.VIEW_OPTIONS[0][0]
                        self.place_image(other_image)

    def mirror_image(self, ignore):
        """
        Copy the currently selected image
        """
        if len(self.images) > 0:
            selected_image = self.images[self.selected_image_index]
            file_path = selected_image[self.IMAGE_PATH_INDEX]
            file_path_split = self.get_name_from_path(file_path, "/")
            file_name_split = self.get_name_from_path(file_path_split[1], ".")
            file_name = file_name_split[0] + "_copy." + file_name_split[1]
            self.add_image([file_path], file_name)

    def delete_image(self, ignore, custom_index=-10):
        """
        Delete the currently selected image and all the information that is attached to it.
        """
        if len(self.images) > 0:
            # print("custom index = " + str(custom_index))
            if custom_index == -10:
                index = self.selected_image_index
                plane = self.images[index][self.IMAGE_PLANE_INDEX][0]
                cmds.delete(plane)
            else:
                index = custom_index
            cmds.textScrollList(self.image_list, e=True, rii=index + 1)
            row_layout = cmds.columnLayout(self.view_options_layout, q=True, ca=True)
            cmds.deleteUI(row_layout[index])

            # clean upp material nodes
            material_nodes = self.images[index][self.IMAGE_MATERIAL_INDEX]
            for node in material_nodes:
                cmds.delete(node)
            self.images.pop(index)

            # update selected image index
            if index == len(self.images) and index > 0:
                index -= 1
                self.set_selected_image(index)
            else:
                if len(self.images) > 0:
                    # update specific ui
                    self.update_specific_tab_ly(index)

            # remove reference group and disable UI if there are no images
            if len(self.images) == 0:
                cmds.delete(self.reference_group)
                self.activate_deactivate_ui([self.mirror_delete_layout, self.match_images_layout, self.options_tabs,
                                             self.real_scale_layout], False)

                self.activate_options = False

    def update_real_scale(self, path, v1, v2, v3):
        """
        Update self.real scale value with he value of the floatFieldGrp
        """
        value = [v1, v2, v3]
        for i in range(0, 3):
            if value[i] < 0.001:
                value[i] = -1
        cmds.floatFieldGrp(path, e=True, v1=value[0], v2=value[1], v3=value[2])
        self.real_scale = value

    def update_use_real_scale(self, check):
        self.use_real_scale = check

    def update_set_camera_to_view(self, ignore):
        """
        Method not in use for now
        :param ignore:
        :return:
        """
        if self.set_camera_to_view:
            self.set_camera_to_view = False
        else:
            self.set_camera_to_view = True

    def update_flip_hv(self, ignore, check_box="None", hv="None"):
        """
        Gets called when a checkbox in the specific layout changes value.
        This method will invert the scaling on the horizontal or vertical axis based on the checkbox value
        :param ignore: ignore
        :param check_box: string, path to the check_box ui element
        :param hv: string, whether to invert the horizontal or vertical axis of the image. options are: "h" or "v"
        :return: nothing
        """
        images = []
        if check_box != "None":
            image = self.images[self.selected_image_index]
            images.append(image)
            value = cmds.checkBox(check_box, q=True, v=True)
            index = -1
            if hv == "h":
                index = 0
            elif hv == "v":
                index = 1
            if index != -1:
                image[self.IMAGE_FLIP_HV_INDEX][index] = value
                image[self.IMAGE_SCALING_INDEX][index] *= -1
        else:
            for image in self.images:
                images.append(image)

        for image in images:
            plane = image[self.IMAGE_PLANE_INDEX][0]
            scale_x, scale_z = image[self.IMAGE_SCALING_INDEX]
            cmds.scale(scale_x, 1, scale_z, plane)

    def display_textures(self, check, active="None"):
        """
        Sets the viewport option for display textures on or off
        :param active: string, when not defined switches the option, when defined sets on or off.
        Options: "True", "False" or leave empty
        :return: nothing
        """
        # found this here:
        # https://forums.autodesk.com/t5/maya-programming/get-current-viewport-that-isn-t-the-script-editor/td-p/8050107
        active_viewport = cmds.playblast(ae=True)
        if active == "None":
            activate = cmds.modelEditor(active_viewport, q=True, dtx=True)
            if activate:
                cmds.modelEditor(active_viewport, e=True, dtx=False)
            else:
                cmds.modelEditor(active_viewport, e=True, dtx=True)
        else:
            if active == "True":
                cmds.modelEditor(active_viewport, e=True, dtx=True)
            else:
                cmds.modelEditor(active_viewport, e=True, dtx=False)

    def freeze_images(self, lock):
        """
        Locks or unlocks move, rotate, scale attributes for all images and nurbs sqaures based on "lock"
        :param lock: bool, whether to lock or unlock the attributes
        :return: nothing
        """
        if len(self.images) > 0:
            children = cmds.listRelatives(self.reference_group, ad=True, type="transform")
            attributes = [".translate", ".rotate", ".scale"]
            for child in children:
                for attribute in attributes:
                    cmds.setAttr(child + attribute, l=lock)

    def set_backface_culling(self, check):
        """
        Enables or disables backface culling
        :param check: bool, whether to enable or disable the backface culling
        :return: nothing
        """
        # I got this part of code from a person online
        # https://cmacvfx.com/python-turning-backface-culling-selected-geo-group/
        if len(self.images) > 0:
            children = cmds.listRelatives(self.reference_group, c=True)
            for child in children:
                hiddenLine = '{0}.backfaceCulling'.format(child)
                if cmds.ls(hiddenLine):
                    cmds.setAttr(hiddenLine, check)

    def update_radius(self, ignore, slider):
        """
        Update self.radius based on the value of the radius slider
        When positioning the images self.radius is taken into account.
        :param ignore: ignore
        :param slider: string, path the the radius slider ui element
        :return: nothing
        """
        if len(self.images) > 0:
            value = cmds.floatSliderGrp(slider, q=True, v=True)
            self.radius = value
            for image in self.images:
                self.place_image(image)

    def update_scale(self, ignore, slider):
        """
        Update the scale of all the planes based on the value of the scale slider
        :param ignore: ignore
        :param slider: string, path to the scale slider ui element
        :return: nothing
        """
        if len(self.images) > 0:
            value = cmds.floatSliderGrp(slider, q=True, v=True)
            for image in self.images:
                plane = image[self.IMAGE_PLANE_INDEX][0]
                are_images_matched = self.are_images_matched(image)
                scale_x, scale_z = image[self.IMAGE_SCALING_INDEX]
                if are_images_matched:
                    print("if")
                    cmds.scale(scale_x * value, 1,
                               scale_z * value, plane)
                else:
                    print("else")
                    self.match_images(image)
                    break

    def update_transparency(self, ignore, slider):
        """
        Update the transparency of all the planes based on the value of the transparency slider
        :param ignore: ignore
        :param slider: string, path to the transparency slider ui element
        :return: nothing
        """
        value = cmds.colorSliderGrp(slider, q=True, rgb=True)
        for image in self.images:
            material = image[self.IMAGE_MATERIAL_INDEX][0]
            cmds.setAttr(material + ".transparency", value[0], value[1], value[2], type="float3")

    def update_specific_tab_ly(self, index):
        """
        Update the specific ui. Changes the value of all the elements according to the current active image.
        :param index: int, the index that defines which image in the self.images list is currently active
        :return:
        """
        selected_image = self.images[index]
        material = selected_image[self.IMAGE_MATERIAL_INDEX][0]
        cmds.attrColorSliderGrp(self.ambient_color, e=True, at="%s.ambientColor" % material)

        flip_hv = selected_image[self.IMAGE_FLIP_HV_INDEX]
        cmds.checkBox(self.flip_h, e=True, v=flip_hv[0])
        cmds.checkBox(self.flip_v, e=True, v=flip_hv[1])

        self.update_specific_scale_text()

    def update_specific_scale_text(self):
        scale_xz = self.images[self.selected_image_index][self.IMAGE_SCALING_INDEX]
        scale_x = abs(round(scale_xz[0], 3))
        scale_z = abs(round(scale_xz[1], 3))
        info = "Scaled Uniformly"
        if scale_x != scale_z:
            if scale_x > scale_z:
                diff = round(scale_x / scale_z, 2)
                info = "Scaled non-uniformly by factor: " + str(diff) + "x in the x axis"
            elif scale_z > scale_x:
                diff = round(scale_z / scale_x, 2)
                info = "Scaled non-uniformly by factor: " + str(diff) + "x in the z axis"
        scale = [scale_x, 1.0, scale_z]
        cmds.text(self.scaling_text, e=True, l=str(scale))
        cmds.text(self.scaling_text_info, e=True, l=info)

    # Methods to create an image

    def import_images(self, ignore):
        file_filter = "*.png *.jpg *.jpeg"
        files = cmds.fileDialog2(fileFilter=file_filter, dialogStyle=2, fm=4)
        if not isinstance(files, types.NoneType):
            self.add_image(files)

    def add_image(self, files, custom_file_name="empty"):
        """
        Adds an image to the self.images list
        :param files: list, with images to add to the array
        :param custom_file_name: string, if specified replaces the file name with a custom file name.
        This is only used when mirroring the image.
        :return: nothing
        """
        # if there is no image yet create a group and enable UI
        if len(self.images) == 0:
            self.reference_group = cmds.group(em=True, name="Reference")
            self.activate_deactivate_ui([self.mirror_delete_layout, self.match_images_layout, self.real_scale_layout],
                                        True)
            # self.display_textures("True")

        # loops over all incoming images and constructs a list which contains all the necessary information
        # about this image
        for i, file_path in enumerate(files):
            if len(self.images) < self.MAX_IMAGES:
                image = []
                self.images.append(image)
                index = len(self.images) - 1
                file_path = "" + files[i]
                if custom_file_name == "empty":
                    name = self.get_name_from_path(file_path, "/")
                    file_name = name[1]
                else:
                    file_name = custom_file_name
                cmds.textScrollList(self.image_list, e=True, append=file_name)
                self.images[index].append(file_path)
                self.images[index].append(file_name)
                self.create_view_options(image)
                self.assign_view(image)
                self.create_reference_plane(image)
                self.create_locator(image)
                self.images[index].append([1, 1])
                self.images[index].append([False, False])
                self.place_image(image)
                self.set_selected_image(len(self.images) - 1)

    def create_view_options(self, image):
        """
        Adds a row layout with 7 radio buttoss for the current active image
        """
        index = len(self.images) - 1
        row_rl = cmds.rowLayout(p=self.view_options_layout, nc=7, h=15)
        self.images[index].append(row_rl)
        view_collection = cmds.radioCollection(p=row_rl)
        self.images[index].append(view_collection)
        for i, option in enumerate(self.VIEW_OPTIONS):
            cmds.radioButton(option[0], l=option[1], cl=view_collection,
                             onc=partial(self.update_view_options, active_row=row_rl,
                                         active_collection=view_collection))

    def assign_view(self, image):
        """
        Assigns the first view to the image that is currently not being used
        :param image:
        :return: nothing
        """
        image_index = len(self.images) - 1
        view = self.VIEW_OPTIONS[1][0]  # set "front" as default

        # loops through all the possible view options
        if len(self.images) > 1:
            i = 1  # start from 2nd view option
            while i < len(self.VIEW_OPTIONS):
                view_candidate = self.VIEW_OPTIONS[i][0]  # get long name

                # loops through all other images and checks if any other image has this view already assigned
                view_is_used = False
                j = 0
                while j < len(self.images) - 1:  # don't look at last one
                    current_row_view = self.images[j][self.IMAGE_VIEW_INDEX]
                    if view_candidate == current_row_view:
                        view_is_used = True
                        break
                    j += 1

                # if no other image has this view assigned, assign it to the current active image
                if not view_is_used:
                    view = view_candidate
                    break
                i += 1

        button = image[self.IMAGE_RL_INDEX] + "|" + view
        cmds.radioButton(button, e=True, sl=True)
        self.images[image_index].append(view)

    def create_reference_plane(self, image):
        # create plane
        plane = cmds.polyPlane(sx=1, sy=1)
        index = len(self.images) - 1
        self.images[index].append(plane)
        cmds.parent(plane[0], self.reference_group)
        self.catch_deletion(plane[0])

        # set plane dimensions
        material_properties = self.create_material(image)
        size_x = material_properties[0][0] * 10 * self.working_units_scalar
        size_y = material_properties[0][1] * 10 * self.working_units_scalar
        shading_group = material_properties[1]

        # assign material to plane
        cmds.setAttr("%s.width" % plane[1], size_x / 100)
        cmds.setAttr("%s.height" % plane[1], size_y / 100)
        cmds.sets(plane[0], e=True, forceElement=shading_group)

    def create_material(self, image):
        """
        Creates a material for the currently active image and return all neceassary
        :param image: list, currently active image
        :return: the image size and all the necessary information about the material
        """
        material_info = []
        file_path = image[self.IMAGE_PATH_INDEX]
        index = len(self.images) - 1

        # making file_name, replace . with _ otherwise maya will throw error
        name = image[self.IMAGE_NAME_INDEX]
        name = self.get_name_from_path(name, ".")
        file_name = name[0] + "_" + name[1]

        material = cmds.shadingNode("lambert", asShader=True, name=file_name)
        shading_group = cmds.sets(name='%sSG' % material, empty=True, renderable=True, noSurfaceShader=True)
        cmds.connectAttr('%s.outColor' % material, '%s.surfaceShader' % shading_group)
        texture = cmds.shadingNode("file", asTexture=True, isColorManaged=True)
        cmds.connectAttr("%s.outColor" % texture, "%s.color" % material)
        cmds.setAttr("%s.fileTextureName" % texture, file_path, type="string")
        image_size = cmds.getAttr("%s.outSize" % texture)
        image_size = image_size[0]
        material_info.append(material)
        material_info.append(shading_group)
        material_info.append(texture)
        self.images[index].append(material_info)
        return image_size, shading_group

    def create_locator(self, image):
        """
        Create a nurbs square for the currently active image
        :param image: list, currently active image
        :return: nothing
        """
        index = len(self.images) - 1
        view = self.images[index][self.IMAGE_VIEW_INDEX]
        plane = self.images[index][self.IMAGE_PLANE_INDEX][0]
        square = cmds.nurbsSquare(nr=[0, -1, 0], sl1=self.NURBS_SQUARE_SIZE * self.working_units_scalar,
                                  sl2=self.NURBS_SQUARE_SIZE * self.working_units_scalar)
        cmds.parent(square[0], plane)
        self.images[index].append(square)

    # methods for image placement in the world

    def place_image(self, image):
        """
        Position and rotate all images correctly.
        :param image: list, currently active image
        :return: nothing
        """
        positions = [(0, 0, 0), (0, 0, -1), (0, 0, 1), (-1, 0, 0), (1, 0, 0), (0, -1, 0), (0, 1, 0)]
        rotations = [(0, 0, 0), (90, 0, 0), (90, 180, 0), (90, 90, 0), (90, -90, 0), (0, 90, 0), (180, 90, 0)]

        # loop through all the possible view options until 1 matches the current view of the image
        view = image[self.IMAGE_VIEW_INDEX]
        view_pos_index = 0
        view_is_found = False
        j = 0
        while j < len(self.VIEW_OPTIONS):
            view_match = self.VIEW_OPTIONS[j][0]
            if view == view_match:
                # print("view match = %s" % view_match)
                view_pos_index = j
                # print("view match index = %i" % view_match_index)
                view_is_found = True
                break
            j += 1

        # position the image based on this view
        if view_is_found:
            pos = positions[view_pos_index]
            rot = rotations[view_pos_index]

            position = [0, 0, 0]
            for i in range(0, 3):
                position[i] = pos[i] * self.BASE_SCALE

            plane = image[self.IMAGE_PLANE_INDEX][0]
            cmds.move(position[0], position[1], position[2], plane, a=True)
            locator = image[self.IMAGE_LOCATOR_INDEX][0]
            pivot_pos = cmds.xform(locator, q=True, ws=True, t=True)

            # # calculate offset from the locator to where to plane should be
            offset = [0, 0, 0]
            for i in range(0, 3):
                offset[i] = position[i] - pivot_pos[i]

            for i in range(0, 3):
                position[i] += offset[i]

            for i in range(0, 3):
                position[i] *= self.working_units_scalar * self.radius

            # cmds.move(0, 0, 0, plane, a=True)
            cmds.move(position[0], position[1], position[2], plane, a=True)
            cmds.rotate(rot[0], rot[1], rot[2], plane, a=True)
            # self.update_specific_checkbox("ignore", self.flip_h, "h")
            # self.update_specific_checkbox("ignore", self.flip_v, "v")

    def match_images(self, ignore):
        """
        Match all the nurbs squares off all the images so they have the same dimensions
        """
        dimensions = [1, 1, 1]  # [width, height, length]
        width, height, length = 1, 1, 1
        index = 0
        base_image = self.images[index]
        base_square = base_image[self.IMAGE_LOCATOR_INDEX][0]
        base_view = self.images[index][self.IMAGE_VIEW_INDEX]

        # Get the first 2 dimensions based on the image view
        if base_view == "Front" or base_view == "Back":
            width = cmds.getAttr(base_square + ".scaleX")
            height = cmds.getAttr(base_square + ".scaleZ")
            axis_found = ["Front", "Back"]
        elif base_view == "Left" or base_view == "Right":
            length = cmds.getAttr(base_square + ".scaleX")
            height = cmds.getAttr(base_square + ".scaleZ")
            axis_found = ["Left", "Right"]
        else:
            length = cmds.getAttr(base_square + ".scaleX")
            width = cmds.getAttr(base_square + ".scaleZ")
            axis_found = ["Top", "Bottom"]
        dimensions[0] = width
        dimensions[1] = height
        dimensions[2] = length

        # Find the last dimension
        i = 1
        while i < len(self.images):
            other_image = self.images[i]
            other_view = other_image[self.IMAGE_VIEW_INDEX]

            if other_view != axis_found[0] and other_view != axis_found[1]:
                other_square = other_image[self.IMAGE_LOCATOR_INDEX][0]
                dimension_scalar = self.find_dimension_scalar(base_view, other_view, other_square)
                scalar = dimensions[dimension_scalar[0]] / dimension_scalar[1]
                last_dimension = 1
                if dimension_scalar[0] != -1:
                    last_dimension = dimension_scalar[4] * scalar

                if axis_found == ["Front", "Back"]:
                    dimensions[2] = last_dimension
                elif axis_found == ["Left", "Right"]:
                    dimensions[0] = last_dimension
                else:  # axis_found == ["Top", "Bottom"]
                    dimensions[1] = last_dimension
                break
            i += 1

        # Scale all the images so they match the required dimensions
        # Position all the images correctly
        self.dimensions = dimensions

        if self.use_real_scale:
            for i in range(0, 3):
                real_scale = self.real_scale[i]
                if real_scale > 0:
                    dimensions[i] *= real_scale / (self.dimensions[i] * self.NURBS_SQUARE_SIZE / self.BASE_SCALE)

        i = 0
        while i < len(self.images):
            other_image = self.images[i]
            other_view = other_image[self.IMAGE_VIEW_INDEX]
            other_square = other_image[self.IMAGE_LOCATOR_INDEX][0]
            dimension_scalar = self.find_dimension_scalar(base_view, other_view, other_square)
            if dimension_scalar[0] != -1:
                scalar_1 = dimensions[dimension_scalar[0]] / dimension_scalar[1]
                scalar_2 = dimensions[dimension_scalar[3]] / dimension_scalar[4]
                scale_x, scale_z = 1, 1
                if dimension_scalar[2] == "X":
                    scale_x = scalar_1
                    scale_z = scalar_2
                elif dimension_scalar[2] == "Z":
                    scale_x = scalar_2
                    scale_z = scalar_1
                elif dimension_scalar[2] == "Y":
                    scale_x = 1
                    scale_z = 1
                plane = other_image[self.IMAGE_PLANE_INDEX][0]
                cmds.scale(scale_x, 1, scale_z, plane)
                flip_hv = other_image[self.IMAGE_FLIP_HV_INDEX]
                flip_h = 1
                if flip_hv[0] == True:
                    flip_h = -1
                flip_v = 1
                if flip_hv[1] == True:
                    flip_v = -1
                other_image[self.IMAGE_SCALING_INDEX] = [scale_x * flip_h, scale_z * flip_v]

            i += 1

        self.recalculate_pivot()

        for image in self.images:
            self.place_image(image)

        # enable the general and specific ui if the match button is pressed for the 1st time
        if self.activate_options == False:
            self.activate_options = True
            children = cmds.tabLayout(self.options_tabs, q=True, ca=True)
            for child in children:
                cmds.formLayout(child, e=True, en=True)

        self.update_specific_scale_text()
        self.update_flip_hv("ignore")

    def find_dimension_scalar(self, base_view, other_view, other_square):
        """
        Compares 2 images and checks what axis they have in common and what axis they do not have in common.
        :param base_view: first view
        :param other_view: second view
        :param other_square: the nurbs square attached to the image of the "second view"
        :return: the axis both images have in coommon, The axis scale of the nurbs square of the second image,
        The scale axis value of the second image that was checked, the axis both images do not have in common
        (if images or in f.e front and back view or left and right or top and bottom then this will be the second axis
        both images have in common), The other scale axis value of the second image.
        """
        dimension_1 = -1
        same_dimension_scalar_1 = 1
        axis = "Y"
        dimension_2 = -1
        same_dimension_scalar_2 = 1
        if base_view == "Front" or base_view == "Back":
            if other_view == "Front" or other_view == "Back":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 0
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 1
            elif other_view == "Left" or other_view == "Right":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_1 = 1
                axis = "Z"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_2 = 2
            elif other_view == "Top" or other_view == "Bottom":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 2
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 0
        elif base_view == "Left" or base_view == "Right":
            if other_view == "Front" or other_view == "Back":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_1 = 1
                axis = "Z"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_2 = 0
            elif other_view == "Left" or other_view == "Right":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_1 = 1
                axis = "Z"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_2 = 2
            elif other_view == "Top" or other_view == "Bottom":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 2
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 0
        elif base_view == "Top" or base_view == "Bottom":
            if other_view == "Front" or other_view == "Back":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 0
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 1
            elif other_view == "Left" or other_view == "Right":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 2
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 1
            elif other_view == "Top" or other_view == "Bottom":
                same_dimension_scalar_1 = cmds.getAttr(other_square + ".scale" + "X")
                dimension_1 = 2
                axis = "X"
                same_dimension_scalar_2 = cmds.getAttr(other_square + ".scale" + "Z")
                dimension_2 = 0

        return dimension_1, same_dimension_scalar_1, axis, dimension_2, same_dimension_scalar_2

    def recalculate_pivot(self):
        """
        Set the pivot of the plane to where the pivot of the nurbs square is.
        """
        for image in self.images:
            plane = image[self.IMAGE_PLANE_INDEX][0]
            locator = image[self.IMAGE_LOCATOR_INDEX][0]
            pivot_pos = cmds.xform(locator, q=True, ws=True, t=True)
            pivot_names = [plane + ".scalePivot", plane + ".rotatePivot"]
            cmds.move(pivot_pos[0], pivot_pos[1], pivot_pos[2], pivot_names, a=True, ws=True)

    def are_images_matched(self, image):
        """
        Checks if an image is miss aligned with how it should be
        :param image: list, image list to evaulate
        :return: returns whether the image is aligned or miss aligned around 0, 0, 0
        """

        # Check how many attributes of the position (x,y,z) have values bigger than 0
        locator = image[self.IMAGE_LOCATOR_INDEX][0]
        pivot_pos = cmds.xform(locator, q=True, ws=True, t=True)
        test = 0
        for i in pivot_pos:
            if abs(i) > 0.0001:
                test += 1

        # if a plane is perfectly aligned around 0,0,0 then only 1 attribute x,y or z will be bigger than 0
        is_image_matched = False
        if test == 1:
            is_image_matched = True
        return is_image_matched

    # other methods

    def check_working_units(self, set_value="False"):
        # mm | millimeter | cm | centimeter | m | meter | km | kilometer | in | inch | ft | foot | yd | yard | mi | mile]
        unit = cmds.currentUnit(q=True, l=True)
        value = 1
        if unit == "m":
            value = 0.01
        elif unit == "mm":
            value = 10
        elif unit == "in":
            value = 0.39370079
        elif unit == "ft":
            value = 0.032808399
        elif unit == "yd":
            value = 0.010936133
        elif unit == "cm":
            value = 1

        if set_value:
            self.working_units_scalar = value
        return value

    def set_selected_image(self, image_index=-10):
        """
        Update the currently selected image. This can happen in 2 ways. A plane is selected in the outliner.
        Then the corresponding image in the textscrolllist will be selected.
        Or the selection in the textscrolllist changed, then the corresponding plane will be selected in the outliner
        :param image_index: int, used to select a specific image in the textscrolllist
        :return: nothing
        """
        if len(self.image_list) > 0:
            if image_index == -10:
                selected_image = cmds.textScrollList(self.image_list, q=True, sii=True)
                index = selected_image[0] - 1
            else:
                index = image_index
                cmds.textScrollList(self.image_list, e=True, sii=index + 1)
            self.selected_image_index = index

            # update specific ui
            self.update_specific_tab_ly(index)

            selected_image = self.images[index]
            # select the correct plane in the outliner when it's selected in the script UI
            if len(selected_image) - 1 >= self.IMAGE_PLANE_INDEX:
                selected_plane = selected_image[self.IMAGE_PLANE_INDEX][0]
                cmds.select(selected_plane, r=True)

    def is_image_selected_in_outLiner(self):
        """
        Scriptjob that runs every time the selection in the outline changes.
        Checks whether the new selected item is 1 of the image planes. Ifso, update the currently selected image.
        """
        selection = cmds.ls(sl=True)
        i = 0
        if len(self.images) > 0 and len(selection) > 0:
            eval_object = selection[0]
            while i < len(self.images):
                plane = self.images[i][self.IMAGE_PLANE_INDEX][0]
                if eval_object == plane:
                    self.set_selected_image(i)
                    break
                i += 1

    def get_name_from_path(self, path, separator):
        name = str(path).rsplit(separator, 1)
        return name[0], name[1]

    def get_row_index(self, row_array, row):
        """
        Check at what index a specific row is in the row_array
        :param row_array: list, to loop through
        :param row: string , path to the row layout ui element
        :return: index in the list
        """
        index = 0
        for i, item in enumerate(row_array):
            if item == row:
                index = i
                break
        return index

    def catch_deletion(self, image_name):
        """
        Attach a scriptjob to the currently active image.
        This scriptjob will activate once the plane is deleted from the outliner/world.
        """
        index = len(self.images) - 1
        # scriptjob is automatically deleted when the plane is deleted
        script_job = cmds.scriptJob(attributeDeleted=((image_name + ".tx"), partial(self.object_deleted, image_name)),
                                    ro=True)
        self.images[index][self.IMAGE_PLANE_INDEX].append(script_job)

    def object_deleted(self, image_name):
        object_found = False
        i = 0
        # loop through all the images in self.images and check plane was just deleted
        while i < len(self.images):
            object_name = self.images[i][self.IMAGE_PLANE_INDEX][0]
            if image_name == object_name:
                object_found = True
                break
            i += 1
        if object_found:
            self.delete_image(False, i)

    def end_script(self):
        # remove scriptjob for checking if the selecton in the outliner has changed when the script is closed.
        cmds.scriptJob(kill=self.script_job)


reference_plane_setup = ReferencePlaneSetup(340, 300)
