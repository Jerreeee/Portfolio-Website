'use client';

import React from 'react';
import type { ComponentProps } from 'react';
import ReactPlayer from 'react-player';
export type ReactPlayerProps = ComponentProps<typeof ReactPlayer>;
import { Component } from '@/Themes/BaseTheme'
import { useTheme } from '@/Themes/ThemeProvider';
import { ImageProps } from '@/Themes/Default/Components/Generic/Image'
import { StyleProps, mergeStyleProps } from '@/Utils/StyleProps'

export type MediaType = 'image' | 'fileVideo' | 'embeddedVideo';

export type ImageMediaItem = {
    type: 'image';
    src: string;
    alt?: string;
    imageProps?: Omit<ImageProps, 'src' | 'alt'>;
};

export type FileVideoMediaItem = {
    type: 'fileVideo';
    src: string;
    thumbnail?: string;
    videoProps?: Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'>;
};

export type EmbeddedVideoMediaItem = {
    type: 'embeddedVideo';
    src: string;
    playerProps?: Omit<ReactPlayerProps, 'src'>;
};

// Union of all types
export type MediaItem =
    | ImageMediaItem
    | FileVideoMediaItem
    | EmbeddedVideoMediaItem;

export interface MediaTheme {
    style?: StyleProps;
}

export type MediaSettings = {};

export interface MediaProps {
    item: MediaItem;
}

export const MediaCmp = MediaCmpInternal as Component<
  MediaSettings,
  MediaProps
>;

function MediaCmpInternal(props: MediaProps) {
    const { theme: activeTheme } = useTheme();
    const settings: MediaSettings = activeTheme.components.media?.settings;
    if (!settings) return null;

    const Image = activeTheme.components.image.cmp;

    switch (props.item.type) {
        case 'image':
        return (
            <div className='media media__image object-cover'>
                <Image
                    src={props.item.src}
                    alt={props.item.alt || ''}
                    removeWrapper
                    {...props.item.imageProps}
                />
            </div>
        );
        case 'fileVideo':
        return (
            <video
            src={props.item.src}
            className="media media__video w-full h-full object-cover"
            {...props.item.videoProps}
            />
        );
        case 'embeddedVideo':
        return (
            <ReactPlayer
            src={props.item.src}
            width="100%"
            height="100%"
            controls
            className="media media__player object-cover"
            {...props.item.playerProps}
            />
        );
        default:
        return null;
    }
}
