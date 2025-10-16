
--#################################
-- Imports
--#################################

local utils = require("utils")
local KEYS = utils.KEYS
local DIRECTION = utils.DIRECTION
local Cell = utils.Cell
local ColoredCell = utils.ColoredCell
local CellSprite = utils.CellSprite

local Snake = require("snake")
local grid_include = require("grid")
local Grid = grid_include.Grid
local GridArea = grid_include.GridArea
local Renderer = require("renderer")

--#################################
-- Game Variables
--#################################
local game_over = false
local drawn_game_over_screen = false
local grid = Grid.new(20, 20, 30, 2)
local exlusion_area = GridArea.new(Cell.new(7, 7), Cell.new(14, 14))
local RENDERER = Renderer.new(grid)
---@type Snake
local snake = nil

local BITMAPS = {
    APPLE = Bitmap.new("apple.png", false)
}

local food = CellSprite.new(Cell.new(0, 0), BITMAPS.APPLE)

--#################################
-- GameEngine methods, called automatically
--#################################

---Called from c++ once before the game starts
---@return nil
function GameInit()
    math.randomseed(os.time())
    GAME_ENGINE:SetTitle("Snake - Denayer Jeroen - 2DAE10")
    GAME_ENGINE:SetWidth(grid:GetWidth())
    GAME_ENGINE:SetHeight(grid:GetHeight())
    GAME_ENGINE:SetKeyList("WASDR"
        .. string.char(KEYS.UP)
        .. string.char(KEYS.DOWN)
        .. string.char(KEYS.LEFT)
        .. string.char(KEYS.RIGHT)
    )
end

---Called from c++ once at the start of the game
---@return nil
function GameStart()
    game_over = false
    drawn_game_over_screen = false
    snake = Snake.new()
    RENDERER.draw_grid = true
    grid:RegenerateRandomCollisionAreas(3, 5, 5, exlusion_area)
    food:SetCellPosition(GetRandomNonCollisionCell())
end

---Called from c++ once at the end of the game
---@return nil
function GameEnd()
end

-- Called from c++ every frame
---@param dt number # delta time
---@return nil
function GameTick(dt)
    if game_over then
        return
    end

    snake:Update(dt)

    -- Check collision
    if snake:IsSelfColliding() or grid:IsCollisionCell(snake.body[1]) then
        RENDERER.draw_grid = false
        game_over = true
        return
    end

    if snake:IsBodyCell(food) then
        snake.grow = true
        food:SetCellPosition(GetRandomNonCollisionCell())
    end
end

---Called from c++ every frame
---@return nil
function GamePaint()
    if game_over then
        if not drawn_game_over_screen then
            DrawGameOverScreen()
        end
        return
    end

    GAME_ENGINE:FillWindowRect(40, 40, 40)
    RENDERER:Render({food, snake})
    GAME_ENGINE:SetColor(255, 255, 255)
    GAME_ENGINE:DrawString("Length: "..tostring(#snake.body), 10, 10)
end

---Called from c++ when a key is pressed, key must first be added using GAME_ENGINE:SetKeyList()!!
---@param key number
---@return nil
function GameKeyPressed(key)
    if (key == KEYS.UP or key == string.byte("W")) and snake.direction ~= DIRECTION.DOWN then
        snake:SetNextDirection(DIRECTION.UP)
    elseif (key == KEYS.DOWN or key == string.byte("S")) and snake.direction ~= DIRECTION.UP then
        snake:SetNextDirection(DIRECTION.DOWN)
    elseif (key == KEYS.LEFT or key == string.byte("A")) and snake.direction ~= DIRECTION.RIGHT then
        snake:SetNextDirection(DIRECTION.LEFT)
    elseif (key == KEYS.RIGHT or key == string.byte("D")) and snake.direction ~= DIRECTION.LEFT then
        snake:SetNextDirection(DIRECTION.RIGHT)
    elseif key == string.byte("R") then
        GameStart()
    end
end

--#################################
-- Lua functions
--#################################

-- Spawn new food
---return Cell
function GetRandomNonCollisionCell()
    ---@type Cell
    local new_cell = nil
    repeat
        new_cell = grid:GetRandomNonCollisionCell()
    until not snake:IsBodyCell(new_cell)
    return new_cell
end

--- Draws the game over screen
function DrawGameOverScreen()
    GAME_ENGINE:FillWindowRect(10, 10, 10)
    RENDERER:Render({food, snake})
    GAME_ENGINE:SetColor(255, 0, 0)
    GAME_ENGINE:DrawString("GAME OVER", math.floor(grid:GetWidth() / 2) - 20, math.floor(grid:GetHeight() / 2))
    GAME_ENGINE:DrawString("Press 'r' to restart", math.floor(grid:GetWidth() / 2) - 40, math.floor(grid:GetHeight() / 2) + 20)
    GAME_ENGINE:SetColor(255, 255, 255)
    GAME_ENGINE:DrawString("Length: " ..tostring(#snake.body), math.floor(grid:GetWidth() / 2) - 10, math.floor(grid:GetHeight() / 2) + 40)
    drawn_game_over_screen = true
end
