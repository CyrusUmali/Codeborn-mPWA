/*
 * Copyright (c) 2022 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from https://ko-fi.com/pheonixkagedesu/shop).

 */

/*:
 * @plugindesc (v.1.2)[BASIC] Extended Loot
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/extended-loot
 *
 * @help
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - You can't change visual appearance via plugin parameters
 *    - Max 3 items rarity levels
 *    - Using in commercial projects NOT allowed
 *
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * !!! Setup Gold representation for Loot List (or Visual Drop)
 *   Plugin Parameters -> Gold Item
 *
 * ===========================================================================
 * Loot List Window 
 * ===========================================================================
 *   Plugin Parameters -> Loot Window (set to TRUE for activate)
 *
 * How create loot list window:
 * 1. Add comment lootList
 * 2. Add default event commands: Change Items, weapons, gold, etc
 * 3. Add comment /lootList
 * 4. Loot list will be opened at this comment and will
 * contains all stuff that you added in 2 via event commands
 *
 * How change loot list header text:
 * Script call: LL_setHeaderText("header text")
 * (support control characters, like \C, \V ect.)
 *
 * How change loot list header \ foreground image:
 * Script call: LL_setHeaderImage("imageName", X, Y)
 * - image should be in folder img\pExtendedLoot
 * - X, Y - margins relative loot window
 *
 * If you have PRO version of plugin you can customize Loot Window via
 * plugin parameters
 * ===========================================================================
 * Pop Up's
 * ===========================================================================
 *   Plugin Parameters -> Pop Up's (set to TRUE for activate)
 *
 * Pop Up's appears automatically when characted received new item
 *
 * If you have PRO version of plugin you can customize Pop Up's via
 * plugin parameters
 *
 * If you want give some items (weapons, armors) to player without pop ups,
 * you can disable Pop Up's system  in game using script call:
 * - VPU_setShouldShow(false); - disable visual drop in game
 * - VPU_setShouldShow(true); - activate again
 * ===========================================================================
 * Visual Drop
 * ===========================================================================
 *   Plugin Parameters -> Visual Drop (set to TRUE for activate)
 *
 * Each time when you using event command "Change Item (weapon, armor, gold)"
 * items will be drops out (jump out) from event to the ground around
 *
 * - Some items will be picked automatically (you can edit auto pick up radius via
 * plugin parameters or disable it).
 * - For pick up certain item player should click on it by mouse (or touch).
 *
 * If you want give some items (weapons, armors) to player without visual drops,
 * you can disable Visual Drop system  in game using script call:
 * - VD_setShouldDrop(false); - disable visual drop in game
 * - VD_setShouldDrop(true); - activate again
 *
 * If you have PRO version of plugin you can customize Visual Drop via
 * plugin parameters
 * ===========================================================================
 * Random Loot
 * ===========================================================================
 *    Special comments for next command "Change Item (weapon, armor, gold)"
 *    (comment should be above event command)
 *
 *    chance:X (where X - from 0 to 100, drop chance in %)
 *    example: chance:50
 *
 *    chance:X|S (where X - switch ID, if switch is ON - 100 *)
 *    example: chance:3|S
 *
 *    chance:X|V (where X - variable ID, chance from variable value, in %)
 *    example: chance:12|V
 *
 *    Script call for check last chance: CH_IsGood();
 *      (returns true if chance a roll)
 *
 * ---------------------------------------------------------------------------
 *    Special comments for gain stuff for player:
 *    (can be combinded with chance comments, but chance should be above)
 *    
 *    add:Z:X:Y
 *      - where Z: item, armor, weapon or i, a, w (shortcuts)
 *      - where X: ID (can be X|V, from variable like with chance)
 *      - where Y: count (can be Y|V, from variable)
 *
 *    Examples:
 *      add:armor:2:1 (add armor with ID 2 count 1)
 *      add:w:100|V:1 (add weapon with ID from variable 100, count 1)
 *
 *
 *  add:Z:[X, X, X, ...]:Y
 *      add ONE of X, where X - ID (can be X|V)
 *
 *     Examples:
 *      add:w:[1, 2, 3, 4]:1 (add weapon with ID 1 or 2 or 3 or 4, count 1)
 *      add:item:[1, 100|V]:8|V
 *          (add item with ID 1 or from variable 100, count from variable 8)
 *
 *  add:Z:X:Y:withChance:C
 *      same as add comment, but you can set chance inline
 *      C can be (C|V - from variable or C|S - from swich)
 *
 *      Examples: 
 *          add:item:2:1:withChance:50
 *          add:weapon:[1, 2, 3]:2:withChance:433|V
 *
 * ===========================================================================
 * Rarity System
 * ===========================================================================
 *   Plugin Parameters -> Rarity System (set to TRUE for activate)
 *      
 * Add your levels via Plugin Parameter -> Items Rarity Levels
 * Assign level to item via Note's section: <pRarity:X>
 * (x - level number from parameters) 
 *
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 *
 
* License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* You can use plugin in commercial projects on the sole
* condition that this plugin has been legally acquired
* (through purchase from https://ko-fi.com/pheonixkagedesu/shop).

 * 

 * @param goldItemSettingsGroup
 * @text Gold Item
 * @default !Important!
 * 
 * @param goldItemId:i
 * @parent goldItemSettingsGroup
 * @text Gold Item
 * @type item
 * @default 0
 * @desc Item for gold representation (icon, name) in loot list and visual drop.
 * 
 * @param goldItemTextColor
 * @parent goldItemSettingsGroup
 * @text Gold text color
 * @default #dea712
 * @desc Gold item name text color in HEX format for loot list and visual drop
 * 
 * @param spacer|MainSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isLootWindowActive:b
 * @text Loot Window
 * @type boolean
 * @default true
 * @desc Is use Loot Window in game?
 * 
 * @param isCloseLootWindowOnESC:b
 * @text Is close on cancel key?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is close loot window by cancel key (ESC)? (or right mouse click)
 * 
 * @param isAutoCloseAllowed:b
 * @text Is auto close?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is automatically close loot window when no more items left?
 * 
 * @param autoCloseDelay:int
 * @parent isAutoCloseAllowed:b
 * @text Auto close Delay
 * @type number 
 * @min 0
 * @max 120
 * @desc Delay before auto close loot list when no more items. 0 - instant.
 * @default 10
 * 
 * @param isAddTakeAllButton:b
 * @text Is Take All option?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is add "Take All" option to list?
 * 
 * @param takeAllCmd:struct
 * @parent isAddTakeAllButton:b
 * @text Take All Command
 * @type struct<str17>
 * @desc [PRO] Take all command settings
 * @default {"title:str":"[Take All]","iconIndex:i":"75","color:str":"#269dde"}
 * 
 * @param takeAllDelay:int
 * @parent isAddTakeAllButton:b
 * @type number
 * @min 0
 * @max 60
 * @text Delay
 * @default 5
 * @desc The delay (in frames) between taking each item when you "Take All" items. 0 - not delay.
 * 
 * @param takeAllSE
 * @parent isAddTakeAllButton:b
 * @text Take All SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take all option clicked (takes all items)
 * 
 * @param takeAllCommandKeyboardKey
 * @parent isAddTakeAllButton:b
 * @text Keyboard Key
 * @desc Keyboard key for Take All option (lowercase)
 * @default f
 * 
 * @param takeAllCommandGamepadKey
 * @parent isAddTakeAllButton:b
 * @text Gamepad Key
 * @desc Gamepad key for Take All option
 * @type select
 * @option A
 * @option X
 * @option Y
 * @option LB
 * @option RB
 * @default X
 * 
 * @param takeItemSE
 * @parent isLootWindowActive:b
 * @text Take Item SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take item from loot list
 * 
 * @param takeGoldSE
 * @parent isLootWindowActive:b
 * @text Take Gold SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take gold from loot list
 * 
 * 
 * 
 * @param lootWindowVisualGroup
 * @text Loot Window Settings
 * @parent isLootWindowActive:b
 * 
 * @param lootWindowSettings:struct
 * @text Loot List Window
 * @type struct<str11>
 * @parent lootWindowVisualGroup
 * @desc [PRO] Loot List Window settings
 * @default {"mainWindowSize:s":"{\"w:int\":\"220\",\"h:int\":\"360\"}","isAbsolutePosition:b":"true","position:s":"{\"x:str\":\"Graphics.width / 2  - 110\",\"y:str\":\"Graphics.height / 2 - 180\"}","isDraggable:b":"true","showCloseButton:b":"true","closeButtonPosition:s":"{\"x:int\":\"81\",\"y:int\":\"356\"}","headerText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"220\\\",\\\"h:int\\\":\\\"80\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"30\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"-7\\\"}\"}","headerDefaultImage:s":"{\"name:str\":\"defaultHeader\",\"margins:struct\":\"{\\\"x:int\\\":\\\"-25\\\",\\\"y:int\\\":\\\"-44\\\"}\"}"}
 * 
 * @param listWindowSettings:struct
 * @parent lootWindowVisualGroup
 * @text Loot List Items
 * @type struct<str16>
 * @desc [PRO] Loot List Items settings
 * @default {"listWindowSize:s":"{\"w:int\":\"220\",\"h:int\":\"318\"}","listWindowMargins:s":"{\"x:int\":\"0\",\"y:int\":\"32\"}","listItem:s":"{\"color:str\":\"#ffffff\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"22\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","itemCount:s":"{\"color:str\":\"#dbd9b2\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"20\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","goldCount:s":"{\"color:str\":\"#dea712\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"22\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","itemCountText:str":"x *0"}
 * 
 * 
 * @param spacer|treasurePopUpSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 * 
 * @param isTreasuresPopUpActive:b
 * @text Pop Up's
 * @type boolean
 * @default true
 * @desc Is use Pop Up system in game?
 * 
 * @param popUpMainSettings:s
 * @parent isTreasuresPopUpActive:b
 * @text Pop Up Config
 * @type struct<str8>
 * @desc [PRO] Pop Up System configuration
 * @default {"margins:s":"{\"x:int\":\"0\",\"y:int\":\"-70\"}","opacityStep:i":"10","moveStep:i":"1","stayTime:i":"80","dyBetweenLines:i":"20","appearSE:str":""}
 * 
 * @param popUpLineSettings:s
 * @parent isTreasuresPopUpActive:b
 * @text PopUp Item
 * @type struct<str7>
 * @desc [PRO] Pop Item visual settings and configuration
 * @default {"text:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"80\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#EAEAEA\"}","back:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"0\\\",\\\"h:int\\\":\\\"20\\\"}\",\"fillColor:str\":\"#000000\",\"fillOpacity:i\":\"156\",\"borderColor:str\":\"#000000\",\"borderThickness:i\":\"0\",\"borderOpacity:i\":\"255\"}","backMargins:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"14\"}","countTextStr:str":"x%0","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"50\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"11\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"2\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#dbd9b2\"}"}
 * 
 * @param maxPopItemTextLength:int
 * @text Max Length
 * @parent isTreasuresPopUpActive:b
 * @type number
 * @min 10
 * @default 15
 * @desc You can limit items name text for not create too long PopUp's
 * 
 * @param spacer|VisualDropSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isVisualDropActive:b
 * @text Visual Drop
 * @type boolean
 * @default true
 * @desc Is use Visual Drop system in game?
 * 
 * @param visualDropMainSettings:s
 * @parent isVisualDropActive:b
 * @text Visual Drop Config
 * @type struct<str14>
 * @desc [PRO] Visual Drop System configuration
 * @default {"autoLootDistanceInPx:i":"80","clickLootDistanceInPx:i":"160","moveSpeed:i":"5","flowAnimation:s":"{\"speed:i\":\"0.1\",\"height:i\":\"1.2\"}","gainItemSE:str":"","dropItemSE:str":"","jumpX:s":"{\"min:i\":\"0.1\",\"max:i\":\"1.5\"}","jumpY:s":"{\"min:i\":\"0.1\",\"max:i\":\"1.5\"}","dropDelay:s":"{\"min:i\":\"0.00\",\"max:i\":\"500.00\"}","hintTextOnlyWhenHovered:b":"true","hintTextMargins:s":"{\"x:int\":\"12\",\"y:int\":\"-20\"}"}
 * 
 * @param visualDropItemSettings:s
 * @parent isVisualDropActive:b
 * @text Visual Drop Item
 * @type struct<str7>
 * @desc [PRO] Drop Item visual settings and configuration
 * @default {"text:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"80\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#EAEAEA\"}","back:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"0\\\",\\\"h:int\\\":\\\"20\\\"}\",\"fillColor:str\":\"#000000\",\"fillOpacity:i\":\"220\",\"borderColor:str\":\"#000000\",\"borderThickness:i\":\"0\",\"borderOpacity:i\":\"255\"}","backMargins:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"24\"}","countTextStr:str":"x%0","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"50\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"11\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"2\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#dbd9b2\"}"}
 * 
 * 
 * @param spacer|RaritySettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param raritySystem:b
 * @text Rarity System
 * @type boolean
 * @default true
 * @desc Is use Rarity System in game?
 * 
 * @param itemsRarityGroup:structA
 * @parent raritySystem:b
 * @text Items Rarity Levels
 * @type struct<Rarity>[]
 * @default []
 * @desc Rarity levels
 * 
 * @param isRarityInDefault:b
 * @parent raritySystem:b
 * @text Is use in windows?
 * @type boolean
 * @default true
 * @desc Is draw item rarity (name color and extra icons) in default RPG Maker windows (scenes)?
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 */
/*:ru
 * @plugindesc (v.1.2)[BASIC] Extended Loot
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/extended-loot
 *
 * @help
 * ---------------------------------------------------------------------------

 * Это [BASIC] базовая версия плагина и имеет ограничения:
 *    - Вы не можете менять визуальные стили через параметры плагина
 *    - Максимум 3 уровня качества вещей
 *    - ТОЛЬКО для НЕ коммерческих проектов
 *
 *  [PRO] версия плагина не имеет данных ограничений
 
 * ===========================================================================
 * !!! ВАЖНО! Установите предмет для представления золота в сундуках
 *   (этот предмет будет использован только для иконки и названия)
 *
 *   Параметры плагина -> Предмет золота
 *
 * ===========================================================================
 * Loot List Window (Список предметов)
 * ===========================================================================
 *   Параметры плагина -> Loot Window (установите значение в ВКЛ для активации)
 *
 * Как создать список предметов:
 * 1. Добавить комментарий lootList
 * 2. Добавить стандартные команды: изменить вещь, оружие, броню, золото и т.д.
 * 3. Добавить комментарий /lootList
 * 4. Список предметов будет открыт и покажет все предметы, которые вы добавили
 * в пункте 2
 *
 * Как изменить заголовок:
 * Вызов скрипта: LL_setHeaderText("header text")
 * (поддерживает спец. символы: \C, \V ect.)
 *
 * Как изменить картинку заголовка:
 * Вызов скрипта: LL_setHeaderImage("имя картинки", X, Y)
 * - картинка должна быть в папке img\pExtendedLoot
 * - X, Y - координаты относительно окна списка предметов
 *
 * Если у Вас [PRO] версия плагина, Вы можете поменять стиль
 * окна списка предметов через параметры плагина
 * ===========================================================================
 * Всплывающие сообщения
 * ===========================================================================
 *   Параметры плагина -> Pop Up's (установите значение в ВКЛ для активации)
 *
 * Всплыв. сообщ. появляются авт-ки когда персонаж получает предмет
 *
 * Если у Вас [PRO] версия плагина, Вы можете поменять стиль
 * всплывающего сообщения через параметры плагина
 *
 * Если вы хотите дать игроку какие-либо вещи без всплывающего
 * сообщения (временно отключить их), используется вызов скрипта:
 * - VPU_setShouldShow(false); - отключить систему
 * - VPU_setShouldShow(true); - включить систему снова
 * ===========================================================================
 * Визуальный дроп (выпадение вещей)
 * ===========================================================================
 *   Параметры плагина -> Visual Drop (установите значение в ВКЛ для активации)
 *
 * Each time when you using event command "Change Item (weapon, armor, gold)"
 * items will be drops out (jump out) from event to the ground around
 *
 * - Some items will be picked automatically (you can edit auto pick up radius via
 * Параметры плагина or disable it).
 * - For pick up certain item player should click on it by mouse (or touch).
 *
 * If you want give some items (weapons, armors) to player without visual drops,
 * you can disable Visual Drop system  in game using Вызов скрипта:
 * - VD_setShouldDrop(false); - disable visual drop in game
 * - VD_setShouldDrop(true); - activate again
 *
 * If you have PRO version of plugin you can customize Visual Drop via
 * Параметры плагина
 * ===========================================================================
 * Random Loot
 * ===========================================================================
 *    Special comments for next command "Change Item (weapon, armor, gold)"
 *    (comment should be above event command)
 *
 *    chance:X (where X - from 0 to 100, drop chance in %)
 *    example: chance:50
 *
 *    chance:X|S (where X - switch ID, if switch is ON - 100 *)
 *    example: chance:3|S
 *
 *    chance:X|V (where X - variable ID, chance from variable value, in %)
 *    example: chance:12|V
 *
 *    Вызов скрипта for check last chance: CH_IsGood();
 *      (returns true if chance a roll)
 *
 * ---------------------------------------------------------------------------
 *    Special comments for gain stuff for player:
 *    (can be combinded with chance comments, but chance should be above)
 *    
 *    add:Z:X:Y
 *      - where Z: item, armor, weapon or i, a, w (shortcuts)
 *      - where X: ID (can be X|V, from variable like with chance)
 *      - where Y: count (can be Y|V, from variable)
 *
 *    Examples:
 *      add:armor:2:1 (add armor with ID 2 count 1)
 *      add:w:100|V:1 (add weapon with ID from variable 100, count 1)
 *
 *
 *  add:Z:[X, X, X, ...]:Y
 *      add ONE of X, where X - ID (can be X|V)
 *
 *     Examples:
 *      add:w:[1, 2, 3, 4]:1 (add weapon with ID 1 or 2 or 3 or 4, count 1)
 *      add:item:[1, 100|V]:8|V
 *          (add item with ID 1 or from variable 100, count from variable 8)
 *
 *  add:Z:X:Y:withChance:C
 *      same as add comment, but you can set chance inline
 *      C can be (C|V - from variable or C|S - from swich)
 *
 *      Examples: 
 *          add:item:2:1:withChance:50
 *          add:weapon:[1, 2, 3]:2:withChance:433|V
 *
 * ===========================================================================
 * Rarity System
 * ===========================================================================
 *   Параметры плагина -> Rarity System (set to TRUE for activate)
 *      
 * Add your levels via Plugin Parameter -> Items Rarity Levels
 * Assign level to item via Note's section: <pRarity:X>
 * (x - level number from parameters) 
 *
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 
 
* Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

* Вы можете использовать плагин в коммерческих проектах на единственном
* условие, что этот плагин был приобретен на законных основаниях
* (через покупку на сайте https://boosty.to/kagedesu).

 * 

 * @param goldItemSettingsGroup
 * @text Gold Item
 * @default !Important!
 * 
 * @param goldItemId:i
 * @parent goldItemSettingsGroup
 * @text Gold Item
 * @type item
 * @default 0
 * @desc Item for gold representation (icon, name) in loot list and visual drop.
 * 
 * @param goldItemTextColor
 * @parent goldItemSettingsGroup
 * @text Gold text color
 * @default #dea712
 * @desc Gold item name text color in HEX format for loot list and visual drop
 * 
 * @param spacer|MainSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isLootWindowActive:b
 * @text Loot Window
 * @type boolean
 * @default true
 * @desc Is use Loot Window in game?
 * 
 * @param isCloseLootWindowOnESC:b
 * @text Is close on cancel key?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is close loot window by cancel key (ESC)? (or right mouse click)
 * 
 * @param isAutoCloseAllowed:b
 * @text Is auto close?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is automatically close loot window when no more items left?
 * 
 * @param autoCloseDelay:int
 * @parent isAutoCloseAllowed:b
 * @text Auto close Delay
 * @type number 
 * @min 0
 * @max 120
 * @desc Delay before auto close loot list when no more items. 0 - instant.
 * @default 10
 * 
 * @param isAddTakeAllButton:b
 * @text Is Take All option?
 * @parent isLootWindowActive:b
 * @type boolean
 * @default true
 * @desc Is add "Take All" option to list?
 * 
 * @param takeAllCmd:struct
 * @parent isAddTakeAllButton:b
 * @text Take All Command
 * @type struct<str17>
 * @desc [PRO] Take all command settings
 * @default {"title:str":"[Take All]","iconIndex:i":"75","color:str":"#269dde"}
 * 
 * @param takeAllDelay:int
 * @parent isAddTakeAllButton:b
 * @type number
 * @min 0
 * @max 60
 * @text Delay
 * @default 5
 * @desc The delay (in frames) between taking each item when you "Take All" items. 0 - not delay.
 * 
 * @param takeAllSE
 * @parent isAddTakeAllButton:b
 * @text Take All SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take all option clicked (takes all items)
 * 
 * @param takeAllCommandKeyboardKey
 * @parent isAddTakeAllButton:b
 * @text Keyboard Key
 * @desc Keyboard key for Take All option (lowercase)
 * @default f
 * 
 * @param takeAllCommandGamepadKey
 * @parent isAddTakeAllButton:b
 * @text Gamepad Key
 * @desc Gamepad key for Take All option
 * @type select
 * @option A
 * @option X
 * @option Y
 * @option LB
 * @option RB
 * @default X
 * 
 * @param takeItemSE
 * @parent isLootWindowActive:b
 * @text Take Item SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take item from loot list
 * 
 * @param takeGoldSE
 * @parent isLootWindowActive:b
 * @text Take Gold SE
 * @type file
 * @dir audio/se
 * @require 1
 * @desc Sound effect when take gold from loot list
 * 
 * 
 * 
 * @param lootWindowVisualGroup
 * @text Loot Window Settings
 * @parent isLootWindowActive:b
 * 
 * @param lootWindowSettings:struct
 * @text Loot List Window
 * @type struct<str11>
 * @parent lootWindowVisualGroup
 * @desc [PRO] Loot List Window settings
 * @default {"mainWindowSize:s":"{\"w:int\":\"220\",\"h:int\":\"360\"}","isAbsolutePosition:b":"true","position:s":"{\"x:str\":\"Graphics.width / 2  - 110\",\"y:str\":\"Graphics.height / 2 - 180\"}","isDraggable:b":"true","showCloseButton:b":"true","closeButtonPosition:s":"{\"x:int\":\"81\",\"y:int\":\"356\"}","headerText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"220\\\",\\\"h:int\\\":\\\"80\\\"}\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"30\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"-7\\\"}\"}","headerDefaultImage:s":"{\"name:str\":\"defaultHeader\",\"margins:struct\":\"{\\\"x:int\\\":\\\"-25\\\",\\\"y:int\\\":\\\"-44\\\"}\"}"}
 * 
 * @param listWindowSettings:struct
 * @parent lootWindowVisualGroup
 * @text Loot List Items
 * @type struct<str16>
 * @desc [PRO] Loot List Items settings
 * @default {"listWindowSize:s":"{\"w:int\":\"220\",\"h:int\":\"318\"}","listWindowMargins:s":"{\"x:int\":\"0\",\"y:int\":\"32\"}","listItem:s":"{\"color:str\":\"#ffffff\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"22\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","itemCount:s":"{\"color:str\":\"#dbd9b2\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"20\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","goldCount:s":"{\"color:str\":\"#dea712\",\"font:s\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"22\\\",\\\"italic:bool\\\":\\\"false\\\"}\"}","itemCountText:str":"x%0","goldCountText:str":"%0"}
 * 
 * 
 * @param spacer|treasurePopUpSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 * 
 * @param isTreasuresPopUpActive:b
 * @text Pop Up's
 * @type boolean
 * @default true
 * @desc Is use Pop Up system in game?
 * 
 * @param popUpMainSettings:s
 * @parent isTreasuresPopUpActive:b
 * @text Pop Up Config
 * @type struct<str8>
 * @desc [PRO] Pop Up System configuration
 * @default {"margins:s":"{\"x:int\":\"0\",\"y:int\":\"-70\"}","opacityStep:i":"10","moveStep:i":"1","stayTime:i":"80","dyBetweenLines:i":"20","appearSE:str":""}
 * 
 * @param popUpLineSettings:s
 * @parent isTreasuresPopUpActive:b
 * @text PopUp Item
 * @type struct<str7>
 * @desc [PRO] Pop Item visual settings and configuration
 * @default {"text:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"80\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#EAEAEA\"}","back:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"0\\\",\\\"h:int\\\":\\\"20\\\"}\",\"fillColor:str\":\"#000000\",\"fillOpacity:i\":\"156\",\"borderColor:str\":\"#000000\",\"borderThickness:i\":\"0\",\"borderOpacity:i\":\"255\"}","backMargins:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"14\"}","countTextStr:str":"x%0","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"50\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"11\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"2\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#dbd9b2\"}"}
 * 
 * @param maxPopItemTextLength:int
 * @text Max Length
 * @parent isTreasuresPopUpActive:b
 * @type number
 * @min 10
 * @default 15
 * @desc You can limit items name text for not create too long PopUp's
 * 
 * @param spacer|VisualDropSettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param isVisualDropActive:b
 * @text Visual Drop
 * @type boolean
 * @default true
 * @desc Is use Visual Drop system in game?
 * 
 * @param visualDropMainSettings:s
 * @parent isVisualDropActive:b
 * @text Visual Drop Config
 * @type struct<str14>
 * @desc [PRO] Visual Drop System configuration
 * @default {"autoLootDistanceInPx:i":"80","clickLootDistanceInPx:i":"160","moveSpeed:i":"5","flowAnimation:s":"{\"speed:i\":\"0.1\",\"height:i\":\"1.2\"}","gainItemSE:str":"","dropItemSE:str":"","jumpX:s":"{\"min:i\":\"0.1\",\"max:i\":\"1.5\"}","jumpY:s":"{\"min:i\":\"0.1\",\"max:i\":\"1.5\"}","dropDelay:s":"{\"min:i\":\"0.00\",\"max:i\":\"500.00\"}","hintTextOnlyWhenHovered:b":"true","hintTextMargins:s":"{\"x:int\":\"12\",\"y:int\":\"-20\"}"}
 * 
 * @param visualDropItemSettings:s
 * @parent isVisualDropActive:b
 * @text Visual Drop Item
 * @type struct<str7>
 * @desc [PRO] Drop Item visual settings and configuration
 * @default {"text:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"80\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"12\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"0\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#EAEAEA\"}","back:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"0\\\",\\\"h:int\\\":\\\"20\\\"}\",\"fillColor:str\":\"#000000\",\"fillOpacity:i\":\"220\",\"borderColor:str\":\"#000000\",\"borderThickness:i\":\"0\",\"borderOpacity:i\":\"255\"}","backMargins:s":"{\"x:int\":\"0\",\"y:int\":\"0\"}","icon:s":"{\"visible:bool\":\"true\",\"index:i\":\"0\",\"size:i\":\"24\"}","countTextStr:str":"x%0","countText:s":"{\"visible:bool\":\"true\",\"size:struct\":\"{\\\"w:int\\\":\\\"50\\\",\\\"h:int\\\":\\\"20\\\"}\",\"alignment:str\":\"left\",\"font:struct\":\"{\\\"face:str\\\":\\\"\\\",\\\"size:int\\\":\\\"11\\\",\\\"italic:bool\\\":\\\"false\\\"}\",\"margins:struct\":\"{\\\"x:int\\\":\\\"0\\\",\\\"y:int\\\":\\\"2\\\"}\",\"outline:struct\":\"{\\\"color\\\":\\\"#000000\\\",\\\"width:int\\\":\\\"2\\\"}\",\"textColor:str\":\"#dbd9b2\"}"}
 * 
 * 
 * @param spacer|RaritySettings @text‏‏‎ ‎@desc ===============================================
 * 
 * @param raritySystem:b
 * @text Rarity System
 * @type boolean
 * @default true
 * @desc Is use Rarity System in game?
 * 
 * @param itemsRarityGroup:structA
 * @parent raritySystem:b
 * @text Items Rarity Levels
 * @type struct<Rarity>[]
 * @default []
 * @desc Rarity levels
 * 
 * @param isRarityInDefault:b
 * @parent raritySystem:b
 * @text Is use in windows?
 * @type boolean
 * @default true
 * @desc Is draw item rarity (name color and extra icons) in default RPG Maker windows (scenes)?
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * 
 */
/*~struct~str0:
 * @param w:int
 * @text Width
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Height
 * @type number
 * @default 100
 * @min 0
*/

/*~struct~str0:ru
 * @param w:int
 * @text Высота
 * @type number
 * @default 100
 * @min 0
 *
 * @param h:int
 * @text Ширина
 * @type number
 * @default 100
 * @min 0
*/

/*~struct~str1:

 * @param face:str
 * @text Face
 * @type string
 * @default
 *
 * @param size:int
 * @text Size
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text IsItalic
 * @type boolean
 * @default false

*/

/*~struct~str1:ru

 * @param face:str
 * @text Название
 * @type string
 * @default
 *
 * @param size:int
 * @text Размер
 * @type number
 * @default 24
 * @min 1
 * 
 * @param italic:bool
 * @text Курсив?
 * @type boolean
 * @default false

*/

/*~struct~str2:

 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/
/*~struct~str2:ru

 * @param x:int
 * @text X
 * @type number
 * @default 0
 * @min -1000
 *
 * @param y:int
 * @text Y
 * @type number
 * @default 0
 * @min -1000

*/
/*~struct~str3:

 * @param color
 * @text Color
 * @type text
 * @default #000000
 * @desc Outline color in HEX (#000000) or empty "" (black)
 *
 * @param width:int
 * @text Width
 * @type number
 * @default 3
 * @min 0
 * @desc Outline stroke width in px

*/
/*~struct~str3:ru

 * @param color
 * @text Цвет
 * @type text
 * @default #000000
 * @desc Цвет обводки в HEX формате (#000000) или пусто "" (чёрный)
 *
 * @param width:int
 * @text Ширина
 * @type number
 * @default 3
 * @min 0
 * @desc Ширина обводки в пикселях

*/
/*~struct~str4:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this element visible? 


 * @param size:struct
 * @text Size
 * @type struct<str0>
 * @default
 * @desc Size of element


 * @param alignment:str
 * @text Alignment
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Text alignment


 * @param font:struct
 * @type struct<str1>
 * @text Font Settings
 * @default
 * @desc Text font settings


 * @param margins:struct
 * @text Margins
 * @type struct<str2>
 * @default
 * @desc Position of element, relative parent


 * @param outline:struct
 * @text Text Outline
 * @type struct<str3>
 * @default
 * @desc Text outline settings


 * @param textColor:str
 * @type string
 * @text Text Color
 * @default #FFFFFF
 * @desc Text color in HEX format (#000000)

*/

/*~struct~str4:ru

 * @param visible:bool
 * @text Активен?
 * @type boolean
 * @default true
 * @desc Будет ли этот элемент видно в игре?


 * @param size:struct
 * @text Размер
 * @type struct<str0>
 * @default
 * @desc


 * @param alignment:str
 * @text Положение
 * @type combo
 * @option center
 * @option right
 * @option left
 * @default center
 * @desc Положение текста


 * @param font:struct
 * @type struct<str1>
 * @text Шрифт
 * @default
 * @desc Настройки шрифта


 * @param margins:struct
 * @text Отступы
 * @type struct<str2>
 * @default
 * @desc Позиция элемента, относительно элемента родителя


 * @param outline:struct
 * @text Обводка
 * @type struct<str3>
 * @default
 * @desc Настройки обводки текста


 * @param textColor:str
 * @type string
 * @text Цвет
 * @default #FFFFFF
 * @desc Цвет текста в HEX формате (#000000)

*/

/*~struct~str5:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this element visible? 


 * @param size:struct
 * @text Size
 * @type struct<str0>
 * @default
 * @desc Size of element


 @param fillColor:str
 @text Fill Color
 @type text 
 @desc Color in HEX format (#000000)
 @default #000000 


 @param fillOpacity:i
 @text Fill Opacity
 @type number 
 @min 0
 @max 255
 @desc From 0 to 255, 0 - transparent, 255 - opaque
 @default 220 


 @param borderColor:str
 @text Borders Color
 @type text 
 @desc Color in HEX format (#000000)
 @default #000000 


 @param borderThickness:i
 @text Borders thickness
 @type number 
 @min 0
 @desc Thickness of borders in PX. 0 - no borders
 @default 0 


 @param borderOpacity:i
 @text Borders Opacity
 @type number 
 @min 0
 @max 255
 @desc From 0 to 255, 0 - transparent, 255 - opaque
 @default 255 

*/


/*~struct~str5:ru

 * @param visible:bool
 * @text Активен?
 * @type boolean
 * @default true
 * @desc Будет ли этот элемент видно в игре? 


 * @param size:struct
 * @text Размер
 * @type struct<str0>
 * @default
 * @desc


 @param fillColor:str
 @text Цвет заливки
 @type text 
 @desc Цвет в HEX формате (#000000)
 @default #000000 


 @param fillOpacity:i
 @text Прозрачность
 @type number 
 @min 0
 @max 255
 @desc От 0 (прозрачен) до 255 (виден)
 @default 220 


 @param borderColor:str
 @text Цвет границ
 @type text 
 @desc Цвет в HEX формате (#000000)
 @default #000000 


 @param borderThickness:i
 @text Толщина границ
 @type number 
 @min 0
 @desc Толщина границ в пикселях. 0 - нет границ
 @default 0 


 @param borderOpacity:i
 @text Прозрачность границ
 @type number 
 @min 0
 @max 255
 @desc От 0 (прозрачен) до 255 (виден)
 @default 255 

*/

/*~struct~str6:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this element visible? 


 @param index:i
 @text Icon Index
 @type number 
 @min 0
 @desc Icon index on IconSet
 @default 0 

 @param size:i
 @text Icon Size
 @type number 
 @min 2
 @desc Icon Size in PX (default icons size is 32)
 @default 24 

*/

/*~struct~str6:ru

 * @param visible:bool
 * @text Активен?
 * @type boolean
 * @default true
 * @desc Будет ли этот элемент видно в игре? 


 @param index:i
 @text Иконка
 @type number 
 @min 0
 @desc Номер иконки
 @default 0 

 @param size:i
 @text Размер
 @type number 
 @min 2
 @desc Размер иконки в пикселях (32 - стандартный для RPG Maker)
 @default 24 

*/


/*~struct~str7:

 @param text:s
 @text Item Name
 @type struct<str4> 
 @desc Item name text settings
 @default {} 

 @param back:s
 @text Background
 @type struct<str5> 
 @desc Background line settings
 @default {} 


 @param backMargins:s
 @text Background Margins
 @type struct<str2> 
 @desc Background line margins relative to Item Text 
 @default {} 


 @param icon:s
 @text Item Icon
 @type struct<str6> 
 @desc Item icon settings. Icon Index field not used (replaced by Item icon in game)  
 @default {} 


 @param countTextStr:str
 @text Count Text
 @type text 
 @desc Item count text. Symbol %0 replaced by Item count in game
 @default x%0 

 @param countText:s
 @text Count Settings
 @type struct<str4> 
 @desc Item count text settings
 @default {} 

*/

/*~struct~str7:ru

 @param text:s
 @text Название
 @type struct<str4> 
 @desc Настройки текста названия вещи
 @default {} 

 @param back:s
 @text Задник
 @type struct<str5> 
 @desc Настройки задника текста
 @default {} 


 @param backMargins:s
 @text Смещение
 @type struct<str2> 
 @desc Смещение задника текста относительно текста
 @default {} 


 @param icon:s
 @text Иконка
 @type struct<str6> 
 @desc Настройки размера икони (только размера, поле Иконка не используется)
 @default {} 


 @param countTextStr:str
 @text Количество (строка)
 @type text 
 @desc Текст количества предмета. %0 будет заменён на количество в игре
 @default x%0 

 @param countText:s
 @text Количество (стиль)
 @type struct<str4> 
 @desc Настройки текста количества предмета
 @default {} 

*/

/*~struct~str8:

 @param margins:s
 @text Margins
 @type struct<str2> 
 @desc Margins relative character (or event)
 @default {} 

 @param opacityStep:i
 @text Opacity Change
 @type number 
 @min 0
 @max 255
 @desc Opacity change per frame when moving up.
 @default 10 

 @param moveStep:i
 @text Move Distance
 @type number 
 @min 0
 @desc Distance (in PX) per frame when moving up.
 @default 1

 @param stayTime:i
 @text Stay Time
 @type number 
 @min 30
 @desc Time (in frames) before Pop Up flies up
 @default 80 

 @param dyBetweenLines:i
 @text Vertical Y
 @type number 
 @min 0
 @desc Vertical distance (Y) between pop up's
 @default 20 

 @param appearSE:str
 @text Sound
 @type file
 @dir audio/se
 @require 1
 @desc Sound effect when Pop Up is appears
 @default  

*/

/*~struct~str8:ru

 @param margins:s
 @text Смещение
 @type struct<str2> 
 @desc Смещение относительно персонажа (события)
 @default {} 

 @param opacityStep:i
 @text Прозрачность
 @type number 
 @min 0
 @max 255
 @desc Изменение прозрачности каждый кадр при движении вверх
 @default 10 

 @param moveStep:i
 @text Дистанция
 @type number 
 @min 0
 @desc Дистанция движения (в пикселях) каждый кадр при движении вверх
 @default 1

 @param stayTime:i
 @text Время
 @type number 
 @min 30
 @desc Время (в кадрах) сколько сообщение ждёт перед тем как начнёт улетать
 @default 80 

 @param dyBetweenLines:i
 @text Расстояние
 @type number 
 @min 0
 @desc Вертикальное расстояние между сообщениями в пикселях (когда появляется много сообщений сразу)
 @default 20 

 @param appearSE:str
 @text Звук
 @type file
 @dir audio/se
 @require 1
 @desc Звук когда сообщение появляется на экране
 @default  

*/


/*~struct~str9:

 * @param visible:bool
 * @text Is Visible?
 * @type boolean
 * @default true
 * @desc Will be this text visible?


 * @param size:struct
 * @text TextBox Size
 * @type struct<str0>
 * @default
 * @desc Size of the text zone


 * @param font:struct
 * @type struct<str1>
 * @text Font Settings
 * @default
 * @desc Text font settings


 * @param margins:struct
 * @text Margins
 * @type struct<str2>
 * @default
 * @desc Text position relative parent

*/
/*~struct~str10:

 @param name:str
 @text Image
 @type file
 @dir img/pExtendedLoot
 @require 1
 @desc Default header image for Visual Loot List
 @default defaultHeader 

 * @param margins:struct
 * @text Margins
 * @type struct<str2>
 * @default
 * @desc Element position relative parent

*/
/*~struct~str11:

 @param mainWindowSize:s
 @text Size
 @type struct<str0> 
 @desc Loot list window size
 @default {} 


 @param isAbsolutePosition:b
 @text Screen relative?
 @type boolean 
 @on Yes
 @off No
 @desc If true, position - absolute relative screen. If false - window will be open near event, position - is margins
 @default true 


 @param position:s
 @text Position
 @type struct<XY2> 
 @desc Absolute or margins (depends on Screen Relative? parameter)
 @default {} 


 @param isDraggable:b
 @text Is Draggable?
 @type boolean 
 @on Yes
 @off No
 @desc If true - player can drag loot list windown by mouse
 @default true 


 @param showCloseButton:b
 @text Is Close Button?
 @type boolean 
 @on Yes
 @off No
 @desc If true - loot list window have a close button
 @default true 


 @param closeButtonPosition:s
 @text Close Btn. Position
 @type struct<str2> 
 @desc Close button position relative loot list window
 @default {} 


 @param headerText:s
 @text Header Text
 @type struct<str9> 
 @desc Header text settings
 @default {}


 @param headerDefaultImage:s
 @text Header Image
 @type struct<str10> 
 @desc Default image for loot list window
 @default {} 

*/

/*~struct~str12:

 @param speed:i
 @text Speed
 @type number 
 @min 0
 @decimals 2
 @desc Animation speed value, bigger  = faster up down cycle
 @default 0.1 


 @param height:i
 @text Height
 @type number 
 @min 0
 @decimals 2
 @desc Maximum vertical animation shift (by Y). 0 - no animation.
 @default 1.2 

*/
/*~struct~str13:

 @param min:i
 @text Minimum value
 @type number 
 @min 0
 @decimals 2
 @desc
 @default 0.1 


 @param max:i
 @text Maximum value
 @type number 
 @min 0
 @decimals 2
 @desc 
 @default 1.5 

*/
/*~struct~str14:

 @param autoLootDistanceInPx:i
 @text Auto Loot Radius
 @type number 
 @min 0
 @desc The radius (in PX) within which the player will automatically pick up items. 0 - no auto loot.
 @default 80 


 @param clickLootDistanceInPx:i
 @text Click Distance
 @type number 
 @min 80
 @desc Maximum distance to pick up item with click (with no moving to item)
 @default 160 

 @param moveSpeed:i
 @text Move Speed
 @type number 
 @min 0
 @desc Item move to player speed (in frames) when pick up. 0 - instant.
 @default 5

 @param flowAnimation:s
 @text Flow animation
 @type struct<str12> 
 @desc On groud (stay) up, down animation settings
 @default {} 

 @param gainItemSE:str
 @text Pick Up SE
 @type file
 @dir audio/se
 @require 1
 @desc Sound effect when pick up item
 @default

 @param dropItemSE:str
 @text Drop Item SE
 @type file
 @dir audio/se
 @require 1
 @desc Sound effect when item drop out from chest
 @default


 @param jumpX:s
 @text Horizontal jump
 @type struct<str13> 
 @desc Drop out jump effect (horizontal, by X axis) settings. Value will be random between min and max
 @default {} 


 @param jumpY:s
 @text Vertical jump
 @type struct<str13> 
 @desc Drop out jump effect (vertical, by Y axis) settings. Value will be random between min and max
 @default {} 


 @param dropDelay:s
 @text Drop Delay
 @type struct<str13> 
 @desc Delay (in frames) before next item drop out from chest. Value will be random between min and max
 @default {}


 @param hintTextOnlyWhenHovered:b
 @text Is Hint only on hover?
 @type boolean 
 @on Yes
 @off No
 @desc If false - hint text (item name) always visible
 @default true 


 @param hintTextMargins:s
 @text Hint margins
 @type struct<str2> 
 @desc Hint text margins relative icon
 @default {}

*/
/*~struct~str15:

 @param color:str
 @text Color
 @type text 
 @desc Color in HEX format (#000000)
 @default #ffffff 


 @param font:s
 @text Font
 @type struct<str1> 
 @desc 
 @default {} 

*/
/*~struct~str16:

 @param listWindowSize:s
 @text Size
 @type struct<str0> 
 @desc Loot List Items window size (inner window) 
 @default {} 


 @param listWindowMargins:s
 @text Margins
 @type struct<str2> 
 @desc Items list margins relative window
 @default {} 


 @param listItem:s
 @text Item
 @type struct<str15> 
 @desc Visual settings for item name text
 @default {} 


 @param itemCount:s
 @text Count
 @type struct<str15> 
 @desc Visual settings for item count text
 @default {} 


 @param goldCount:s
 @text Gold
 @type struct<str15> 
 @desc Visual settings for gold count text
 @default {} 


 @param itemCountText:str
 @text Item Count Format
 @type text 
 @desc Item count text. Symbol %0 replaced by Item count in game
 @default x%0 


 @param goldCountText:str
 @text Gold Count Format
 @type text 
 @desc Gold count text. Symbol %0 replaced by Gold count in game
 @default %0 

*/

/*~struct~str17:

 @param title:str
 @text Title
 @type text 
 @desc Control characters supported
 @default [Take All] 


 @param iconIndex:i
 @text Icon Index
 @type number 
 @min 0
 @desc
 @default 75 


 @param color:str
 @text Text Color
 @type text 
 @desc Color in HEX format (#000000)
 @default #269dde 

*/

/*~struct~Rarity:

 @param icon:i
 @text Icon Index
 @type number 
 @min 0
 @desc Extra Icon, will be drawed above Item icon
 @default 0


 @param color:str
 @text Color
 @type text 
 @desc Special color for item name. Color in HEX format (#000000)
 @default #a1e065

*/

/*~struct~XY2:
 * @param x:str
 * @text X
 * @type text
 * @default 0
 * @desc Number or script (example: Graphics.width / 2)
 *
 * @param y:str
 * @text Y
 * @type text
 * @default 0
 * @desc Number or script (example: $gameVariables.value(12) * 2)
 */


// * MAIN

//%[I] Специальные Note's для предметов <pNoPopUp:1>, <pNoVD:1>

var Imported = Imported || {};
Imported.PKD_ExtendedLoot = true;

var PKD_ExtendedLoot = {};
PKD_ExtendedLoot.version = 120;

PKD_ExtendedLoot.link = function (library) {
    this[library.name] = library;
};

//?VERSION
PKD_ExtendedLoot.isPro = function() { return false; };

// * For parameters
PKD_ExtendedLoot.PP = {};

// * Загрзука параметров
PKD_ExtendedLoot.LoadPluginSettings = () => {
    PKD_ExtendedLoot.PP._loader = new KDCore.ParamLoader("isVisualDropActive:b");
};


/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 05.04.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '2.8.2';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  return Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    return this.drawOnMe(bitmap, x, y, size, size);
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (!KDCore.isMZ()) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      if (this.isHasParameter(paramName)) {
        return this.params[paramName];
      } else {
        return def;
      }
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return parseInt(item);
          case "intA": // * массив чисел
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("int", e);
              });
            } else {
              return [];
            }
            break;
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            if (String.any(item)) {
              return this.parseParameters(JsonEx.parse(item));
            } else {
              return null;
            }
            break;
          case "structA": // * массив структур
            return JsonEx.parse(item).map((e) => {
              return this.parseParameters(JsonEx.parse(e));
            });
          case "str":
            return item;
          case "strA":
            if (String.any(item)) {
              return JsonEx.parse(item).map((e) => {
                return this.parseParamItem("str", e);
              });
            } else {
              return [];
            }
            break;
          case "note": // * если несколько строк в тексте
            return JsonEx.parse(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      inPosition(point) {
        return this.isContainsPoint(point);
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, margins, s, size;
        try {
          size = pluginParams.size;
          s = KDCore.Sprite.FromBitmap(size.w, size.h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback();
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.inPosition(TouchInput);
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isMouseIn()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          return Sprite_UIElement.RootImageFolder;
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      return this.visible = this.params.visible;
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      fw = ImageManager.faceWidth;
      fh = ImageManager.faceHeight;
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0) {
        this._lastValue = index;
        return this._drawIcon(index);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index) {
      this._icon.clear();
      if (index <= 0) {
        return;
      }
      this._icon.drawIcon(0, 0, index, this.params.size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: ""
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss()
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.UI.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.UI.warning(e);
        return "[wrong format text input]";
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new PIXI.Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        size = ImageManager.iconWidth;
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      // * Только в режиме рисования
      if (textState.drawing === true) {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if (textState.drawing === true) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref;
        this.visible = true;
        $gameTemp._floatingWindows.push(this);
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref = this.mainParent) != null) {
            ref.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              this.drawTextExInCenter(newText, x, y, width);
              return;
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j]);
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.1 - 05.04.2022

(function(){
    
    //@[ALIAS]
    var _alias_DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        PKD_ExtendedLoot.LoadPluginSettings();
        PKD_ExtendedLoot.LoadCompatibilityPatches();
        _alias_DataManager_loadDatabase.call(this);
    };

})();

function _0x1de6(_0x551f1e, _0x5bbeee) {
    var _0x221c77 = _0x221c();
    return _0x1de6 = function (_0x1de677, _0x14378d) {
        _0x1de677 = _0x1de677 - 0x16e;
        var _0x1c9c11 = _0x221c77[_0x1de677];
        return _0x1c9c11;
    }, _0x1de6(_0x551f1e, _0x5bbeee);
}
(function (_0x3c9540, _0x203baa) {
    var _0x269110 = _0x1de6, _0x1ae44f = _0x3c9540();
    while (!![]) {
        try {
            var _0x14ac69 = parseInt(_0x269110(0x192)) / 0x1 * (parseInt(_0x269110(0x19f)) / 0x2) + parseInt(_0x269110(0x1a8)) / 0x3 + -parseInt(_0x269110(0x17f)) / 0x4 + -parseInt(_0x269110(0x1a9)) / 0x5 + -parseInt(_0x269110(0x17b)) / 0x6 + -parseInt(_0x269110(0x194)) / 0x7 + parseInt(_0x269110(0x171)) / 0x8;
            if (_0x14ac69 === _0x203baa)
                break;
            else
                _0x1ae44f['push'](_0x1ae44f['shift']());
        } catch (_0x57b2e0) {
            _0x1ae44f['push'](_0x1ae44f['shift']());
        }
    }
}(_0x221c, 0x53869), (function () {
    var _0x10bb58 = _0x1de6, _0x1e869d;
    _0x1e869d = PKD_ExtendedLoot['\x50\x50'], _0x1e869d['\x69\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x41\x63\x74\x69\x76\x65'] = function () {
        var _0x7a9f96 = _0x1de6;
        return this[_0x7a9f96(0x186)][_0x7a9f96(0x191)]('\x69\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x41\x63\x74\x69\x76\x65', !![]);
    }, _0x1e869d['\x69\x73\x54\x72\x65\x61\x73\x75\x72\x65\x73\x50\x6f\x70\x55\x70\x41\x63\x74\x69\x76\x65'] = function () {
        var _0x71c2e1 = _0x1de6;
        return '\x4b\x4c\x70\x74\x6b' !== _0x71c2e1(0x18b) ? this[_0x71c2e1(0x186)][_0x71c2e1(0x191)](_0x71c2e1(0x19a), !![]) : this[_0x71c2e1(0x186)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x71c2e1(0x187), !![]) && !$gameSystem['\x5f\x70\x65\x6c\x4e\x6f\x50\x6f\x70\x55\x70'];
    }, _0x1e869d[_0x10bb58(0x199)] = function () {
        var _0x46fd9a = _0x10bb58;
        return _0x46fd9a(0x18f) !== _0x46fd9a(0x1a6) ? this[_0x46fd9a(0x186)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x46fd9a(0x199), !![]) : {
            '\x74\x69\x74\x6c\x65': _0x46fd9a(0x190),
            '\x69\x63\x6f\x6e\x49\x6e\x64\x65\x78': 0x4b,
            '\x63\x6f\x6c\x6f\x72': _0x46fd9a(0x18e)
        };
    }, _0x1e869d[_0x10bb58(0x196)] = function () {
        var _0x2179f0 = _0x10bb58;
        return _0x2179f0(0x173) !== _0x2179f0(0x17c) ? this['\x5f\x6c\x6f\x61\x64\x65\x72']['\x67\x65\x74\x50\x61\x72\x61\x6d']('\x72\x61\x72\x69\x74\x79\x53\x79\x73\x74\x65\x6d', !![]) : {
            '\x6d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': -0x46
            },
            '\x6f\x70\x61\x63\x69\x74\x79\x53\x74\x65\x70': 0xa,
            '\x6d\x6f\x76\x65\x53\x74\x65\x70': 0x1,
            '\x73\x74\x61\x79\x54\x69\x6d\x65': 0x50,
            '\x64\x79\x42\x65\x74\x77\x65\x65\x6e\x4c\x69\x6e\x65\x73': 0x14,
            '\x61\x70\x70\x65\x61\x72\x53\x45': ''
        };
    }, _0x1e869d[_0x10bb58(0x176)] = function () {
        var _0x63fa7f = _0x10bb58;
        return this[_0x63fa7f(0x186)][_0x63fa7f(0x191)](_0x63fa7f(0x176), !![]);
    }, _0x1e869d[_0x10bb58(0x16f)] = function () {
        var _0x15c966 = _0x10bb58;
        return _0x15c966(0x193) === '\x51\x7a\x71\x51\x74' ? this[_0x15c966(0x186)][_0x15c966(0x191)](_0x15c966(0x17a), '') : {
            '\x6d\x61\x69\x6e\x57\x69\x6e\x64\x6f\x77\x53\x69\x7a\x65': {
                '\x77': 0xdc,
                '\x68': 0x168
            },
            '\x69\x73\x41\x62\x73\x6f\x6c\x75\x74\x65\x50\x6f\x73\x69\x74\x69\x6f\x6e': !![],
            '\x70\x6f\x73\x69\x74\x69\x6f\x6e': {
                '\x78': _0x15c966(0x1a5),
                '\x79': _0x15c966(0x17d)
            },
            '\x69\x73\x44\x72\x61\x67\x67\x61\x62\x6c\x65': !![],
            '\x73\x68\x6f\x77\x43\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e': !![],
            '\x63\x6c\x6f\x73\x65\x42\x75\x74\x74\x6f\x6e\x50\x6f\x73\x69\x74\x69\x6f\x6e': {
                '\x78': 0x51,
                '\x79': 0x164
            },
            '\x68\x65\x61\x64\x65\x72\x54\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0xdc,
                    '\x68': 0x50
                },
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x1e,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': -0x7
                }
            },
            '\x68\x65\x61\x64\x65\x72\x44\x65\x66\x61\x75\x6c\x74\x49\x6d\x61\x67\x65': {
                '\x6e\x61\x6d\x65': _0x15c966(0x197),
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': -0x19,
                    '\x79': -0x2c
                }
            }
        };
    }, _0x1e869d['\x67\x65\x74\x49\x74\x65\x6d\x4c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x53\x65\x74\x74\x69\x6e\x67\x73'] = function () {
        var _0x12537b = _0x10bb58;
        return {
            '\x6c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x53\x69\x7a\x65': {
                '\x77': 0xdc,
                '\x68': 0x13e
            },
            '\x6c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x20
            },
            '\x6c\x69\x73\x74\x49\x74\x65\x6d': {
                '\x63\x6f\x6c\x6f\x72': _0x12537b(0x19b),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x16,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x69\x74\x65\x6d\x43\x6f\x75\x6e\x74': {
                '\x63\x6f\x6c\x6f\x72': '\x23\x64\x62\x64\x39\x62\x32',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x14,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x67\x6f\x6c\x64\x43\x6f\x75\x6e\x74': {
                '\x63\x6f\x6c\x6f\x72': _0x12537b(0x179),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x16,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x69\x74\x65\x6d\x43\x6f\x75\x6e\x74\x54\x65\x78\x74': '\x78\x25\x30',
            '\x67\x6f\x6c\x64\x43\x6f\x75\x6e\x74\x54\x65\x78\x74': '\x25\x30'
        };
    }, _0x1e869d['\x69\x73\x41\x64\x64\x54\x61\x6b\x65\x41\x6c\x6c\x42\x75\x74\x74\x6f\x6e'] = function () {
        var _0xf90ed9 = _0x10bb58;
        return this[_0xf90ed9(0x186)][_0xf90ed9(0x191)]('\x69\x73\x41\x64\x64\x54\x61\x6b\x65\x41\x6c\x6c\x42\x75\x74\x74\x6f\x6e', !![]);
    }, _0x1e869d[_0x10bb58(0x18a)] = function () {
        var _0x138006 = _0x10bb58;
        return this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x138006(0x191)]('\x69\x73\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x41\x6c\x6c\x6f\x77\x65\x64', !![]);
    }, _0x1e869d[_0x10bb58(0x18c)] = function () {
        var _0x2a13d5 = _0x10bb58;
        return _0x2a13d5(0x1aa) !== _0x2a13d5(0x182) ? this[_0x2a13d5(0x186)][_0x2a13d5(0x191)](_0x2a13d5(0x181), 0xa) : {
            '\x6c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x53\x69\x7a\x65': {
                '\x77': 0xdc,
                '\x68': 0x13e
            },
            '\x6c\x69\x73\x74\x57\x69\x6e\x64\x6f\x77\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x20
            },
            '\x6c\x69\x73\x74\x49\x74\x65\x6d': {
                '\x63\x6f\x6c\x6f\x72': '\x23\x66\x66\x66\x66\x66\x66',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x16,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x69\x74\x65\x6d\x43\x6f\x75\x6e\x74': {
                '\x63\x6f\x6c\x6f\x72': _0x2a13d5(0x195),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x14,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x67\x6f\x6c\x64\x43\x6f\x75\x6e\x74': {
                '\x63\x6f\x6c\x6f\x72': '\x23\x64\x65\x61\x37\x31\x32',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x16,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                }
            },
            '\x69\x74\x65\x6d\x43\x6f\x75\x6e\x74\x54\x65\x78\x74': _0x2a13d5(0x189),
            '\x67\x6f\x6c\x64\x43\x6f\x75\x6e\x74\x54\x65\x78\x74': '\x25\x30'
        };
    }, _0x1e869d[_0x10bb58(0x1a2)] = function () {
        var _0x4d5fc6 = _0x10bb58;
        return '\x77\x50\x47\x53\x6b' !== '\x4a\x58\x6c\x47\x57' ? this[_0x4d5fc6(0x186)]['\x67\x65\x74\x50\x61\x72\x61\x6d']('\x74\x61\x6b\x65\x49\x74\x65\x6d\x53\x45', '') : this[_0x4d5fc6(0x186)][_0x4d5fc6(0x191)](_0x4d5fc6(0x176), !![]);
    }, _0x1e869d[_0x10bb58(0x17a)] = function () {
        var _0x31b31c = _0x10bb58;
        return this[_0x31b31c(0x186)][_0x31b31c(0x191)](_0x31b31c(0x17a), '');
    }, _0x1e869d[_0x10bb58(0x175)] = function () {
        var _0x35dfa5 = _0x10bb58;
        return this[_0x35dfa5(0x186)][_0x35dfa5(0x191)](_0x35dfa5(0x175), '');
    }, _0x1e869d['\x74\x61\x6b\x65\x41\x6c\x6c\x44\x65\x6c\x61\x79'] = function () {
        var _0x2b8537 = _0x10bb58;
        if (_0x2b8537(0x177) === _0x2b8537(0x177))
            return this['\x5f\x6c\x6f\x61\x64\x65\x72'][_0x2b8537(0x191)](_0x2b8537(0x183), 0x5);
        else {
            var _0x5c206d;
            return _0x5c206d = this[_0x2b8537(0x186)][_0x2b8537(0x191)]('\x69\x74\x65\x6d\x73\x52\x61\x72\x69\x74\x79\x47\x72\x6f\x75\x70', [
                {
                    '\x63\x6f\x6c\x6f\x72': _0x2b8537(0x170),
                    '\x69\x63\x6f\x6e': 0x0
                },
                {
                    '\x63\x6f\x6c\x6f\x72': _0x2b8537(0x16e),
                    '\x69\x63\x6f\x6e': 0x0
                },
                {
                    '\x63\x6f\x6c\x6f\x72': _0x2b8537(0x178),
                    '\x69\x63\x6f\x6e': 0x0
                }
            ]), _0x5c206d[_0x2b8537(0x19c)](0x0, 0x3);
        }
    }, _0x1e869d[_0x10bb58(0x184)] = function () {
        var _0x3bd2e1 = _0x10bb58;
        return {
            '\x74\x69\x74\x6c\x65': _0x3bd2e1(0x190),
            '\x69\x63\x6f\x6e\x49\x6e\x64\x65\x78': 0x4b,
            '\x63\x6f\x6c\x6f\x72': _0x3bd2e1(0x18e)
        };
    }, _0x1e869d[_0x10bb58(0x1a3)] = function () {
        var _0x20f204 = _0x10bb58;
        return this[_0x20f204(0x186)][_0x20f204(0x191)]('\x74\x61\x6b\x65\x41\x6c\x6c\x43\x6f\x6d\x6d\x61\x6e\x64\x4b\x65\x79\x62\x6f\x61\x72\x64\x4b\x65\x79', '\x66');
    }, _0x1e869d[_0x10bb58(0x17e)] = function () {
        var _0x5e65b3 = _0x10bb58;
        return this[_0x5e65b3(0x186)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x5e65b3(0x17e), '\x58');
    }, _0x1e869d[_0x10bb58(0x172)] = function () {
        var _0x30b3f2 = _0x10bb58;
        return _0x30b3f2(0x198) !== _0x30b3f2(0x198) ? this[_0x30b3f2(0x186)][_0x30b3f2(0x191)](_0x30b3f2(0x1a7), _0x30b3f2(0x179)) : this[_0x30b3f2(0x186)][_0x30b3f2(0x191)](_0x30b3f2(0x172), 0x0);
    }, _0x1e869d[_0x10bb58(0x1a7)] = function () {
        var _0x5e9d1d = _0x10bb58;
        return this[_0x5e9d1d(0x186)][_0x5e9d1d(0x191)]('\x67\x6f\x6c\x64\x49\x74\x65\x6d\x54\x65\x78\x74\x43\x6f\x6c\x6f\x72', '\x23\x64\x65\x61\x37\x31\x32');
    }, _0x1e869d['\x67\x65\x74\x49\x74\x65\x6d\x73\x52\x61\x72\x69\x74\x79\x53\x65\x74\x74\x69\x6e\x67\x73'] = function () {
        var _0x1ba77d = _0x10bb58, _0x7999ea;
        return _0x7999ea = this[_0x1ba77d(0x186)]['\x67\x65\x74\x50\x61\x72\x61\x6d'](_0x1ba77d(0x1a0), [
            {
                '\x63\x6f\x6c\x6f\x72': _0x1ba77d(0x170),
                '\x69\x63\x6f\x6e': 0x0
            },
            {
                '\x63\x6f\x6c\x6f\x72': '\x23\x31\x36\x37\x39\x62\x61',
                '\x69\x63\x6f\x6e': 0x0
            },
            {
                '\x63\x6f\x6c\x6f\x72': _0x1ba77d(0x178),
                '\x69\x63\x6f\x6e': 0x0
            }
        ]), _0x7999ea[_0x1ba77d(0x19c)](0x0, 0x3);
    }, _0x1e869d['\x69\x73\x44\x72\x61\x77\x52\x61\x72\x69\x74\x79\x49\x6e\x44\x65\x66\x61\x75\x6c\x74\x57\x69\x6e\x64\x6f\x77\x73'] = function () {
        var _0x2459fa = _0x10bb58;
        return this[_0x2459fa(0x186)][_0x2459fa(0x191)](_0x2459fa(0x19a), !![]);
    }, _0x1e869d['\x67\x65\x74\x50\x6f\x70\x55\x70\x53\x65\x74\x74\x69\x6e\x67\x73'] = function () {
        var _0x337ded = _0x10bb58;
        return '\x46\x58\x45\x49\x50' === '\x4a\x4f\x6d\x41\x75' ? {
            '\x74\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x50,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x337ded(0x19e),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xc,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x0
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x337ded(0x180)
            },
            '\x62\x61\x63\x6b': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x0,
                    '\x68': 0x14
                },
                '\x66\x69\x6c\x6c\x43\x6f\x6c\x6f\x72': _0x337ded(0x188)[_0x337ded(0x18d)](),
                '\x66\x69\x6c\x6c\x4f\x70\x61\x63\x69\x74\x79': 0x9c,
                '\x62\x6f\x72\x64\x65\x72\x43\x6f\x6c\x6f\x72': _0x337ded(0x188)[_0x337ded(0x18d)](),
                '\x62\x6f\x72\x64\x65\x72\x54\x68\x69\x63\x6b\x6e\x65\x73\x73': 0x0,
                '\x62\x6f\x72\x64\x65\x72\x4f\x70\x61\x63\x69\x74\x79': 0xff
            },
            '\x62\x61\x63\x6b\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x69\x63\x6f\x6e': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x69\x6e\x64\x65\x78': 0x0,
                '\x73\x69\x7a\x65': 0xe
            },
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74\x53\x74\x72': _0x337ded(0x189),
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x32,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x337ded(0x19e),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xb,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x2
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': '\x23\x64\x62\x64\x39\x62\x32'
            }
        } : {
            '\x6d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': -0x46
            },
            '\x6f\x70\x61\x63\x69\x74\x79\x53\x74\x65\x70': 0xa,
            '\x6d\x6f\x76\x65\x53\x74\x65\x70': 0x1,
            '\x73\x74\x61\x79\x54\x69\x6d\x65': 0x50,
            '\x64\x79\x42\x65\x74\x77\x65\x65\x6e\x4c\x69\x6e\x65\x73': 0x14,
            '\x61\x70\x70\x65\x61\x72\x53\x45': ''
        };
    }, _0x1e869d[_0x10bb58(0x19d)] = function () {
        var _0x264d14 = _0x10bb58;
        return {
            '\x74\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x50,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': '\x6c\x65\x66\x74',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xc,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x0
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': '\x23\x45\x41\x45\x41\x45\x41'
            },
            '\x62\x61\x63\x6b': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x0,
                    '\x68': 0x14
                },
                '\x66\x69\x6c\x6c\x43\x6f\x6c\x6f\x72': '\x23\x30\x30\x30\x30\x30\x30'[_0x264d14(0x18d)](),
                '\x66\x69\x6c\x6c\x4f\x70\x61\x63\x69\x74\x79': 0x9c,
                '\x62\x6f\x72\x64\x65\x72\x43\x6f\x6c\x6f\x72': _0x264d14(0x188)[_0x264d14(0x18d)](),
                '\x62\x6f\x72\x64\x65\x72\x54\x68\x69\x63\x6b\x6e\x65\x73\x73': 0x0,
                '\x62\x6f\x72\x64\x65\x72\x4f\x70\x61\x63\x69\x74\x79': 0xff
            },
            '\x62\x61\x63\x6b\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x69\x63\x6f\x6e': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x69\x6e\x64\x65\x78': 0x0,
                '\x73\x69\x7a\x65': 0xe
            },
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74\x53\x74\x72': _0x264d14(0x189),
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x32,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': '\x6c\x65\x66\x74',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xb,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x2
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x264d14(0x195)
            }
        };
    }, _0x1e869d[_0x10bb58(0x1a1)] = function () {
        var _0x30a885 = _0x10bb58;
        return _0x30a885(0x185) !== _0x30a885(0x1a4) ? {
            '\x74\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x50,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': '\x6c\x65\x66\x74',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xc,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x0
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': _0x30a885(0x180)
            },
            '\x62\x61\x63\x6b': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x0,
                    '\x68': 0x14
                },
                '\x66\x69\x6c\x6c\x43\x6f\x6c\x6f\x72': _0x30a885(0x188)[_0x30a885(0x18d)](),
                '\x66\x69\x6c\x6c\x4f\x70\x61\x63\x69\x74\x79': 0xdc,
                '\x62\x6f\x72\x64\x65\x72\x43\x6f\x6c\x6f\x72': _0x30a885(0x188)['\x74\x6f\x43\x73\x73'](),
                '\x62\x6f\x72\x64\x65\x72\x54\x68\x69\x63\x6b\x6e\x65\x73\x73': 0x0,
                '\x62\x6f\x72\x64\x65\x72\x4f\x70\x61\x63\x69\x74\x79': 0xff
            },
            '\x62\x61\x63\x6b\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0x0,
                '\x79': 0x0
            },
            '\x69\x63\x6f\x6e': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x69\x6e\x64\x65\x78': 0x0,
                '\x73\x69\x7a\x65': 0x18
            },
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74\x53\x74\x72': _0x30a885(0x189),
            '\x63\x6f\x75\x6e\x74\x54\x65\x78\x74': {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': 0x32,
                    '\x68': 0x14
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': '\x6c\x65\x66\x74',
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0xb,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x0,
                    '\x79': 0x2
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': '\x23\x64\x62\x64\x39\x62\x32'
            }
        } : this[_0x30a885(0x186)][_0x30a885(0x191)](_0x30a885(0x1a2), '');
    }, _0x1e869d['\x67\x65\x74\x56\x69\x73\x75\x61\x6c\x44\x72\x6f\x70\x53\x65\x74\x74\x69\x6e\x67\x73'] = function () {
        var _0x3ac54f = _0x10bb58;
        return '\x52\x56\x6b\x67\x5a' === _0x3ac54f(0x1ab) ? {
            '\x61\x75\x74\x6f\x4c\x6f\x6f\x74\x44\x69\x73\x74\x61\x6e\x63\x65\x49\x6e\x50\x78': 0x50,
            '\x63\x6c\x69\x63\x6b\x4c\x6f\x6f\x74\x44\x69\x73\x74\x61\x6e\x63\x65\x49\x6e\x50\x78': 0xa0,
            '\x6d\x6f\x76\x65\x53\x70\x65\x65\x64': 0x5,
            '\x66\x6c\x6f\x77\x41\x6e\x69\x6d\x61\x74\x69\x6f\x6e': {
                '\x73\x70\x65\x65\x64': 0.1,
                '\x68\x65\x69\x67\x68\x74': 1.2
            },
            '\x67\x61\x69\x6e\x49\x74\x65\x6d\x53\x45': '',
            '\x64\x72\x6f\x70\x49\x74\x65\x6d\x53\x45': '',
            '\x6a\x75\x6d\x70\x58': {
                '\x6d\x69\x6e': 0.1,
                '\x6d\x61\x78': 1.5
            },
            '\x6a\x75\x6d\x70\x59': {
                '\x6d\x69\x6e': 0.1,
                '\x6d\x61\x78': 1.5
            },
            '\x64\x72\x6f\x70\x44\x65\x6c\x61\x79': {
                '\x6d\x69\x6e': 0x0,
                '\x6d\x61\x78': 0x1f4
            },
            '\x68\x69\x6e\x74\x54\x65\x78\x74\x4f\x6e\x6c\x79\x57\x68\x65\x6e\x48\x6f\x76\x65\x72\x65\x64': !![],
            '\x68\x69\x6e\x74\x54\x65\x78\x74\x4d\x61\x72\x67\x69\x6e\x73': {
                '\x78': 0xc,
                '\x79': -0x14
            }
        } : this[_0x3ac54f(0x186)][_0x3ac54f(0x191)]('\x69\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x41\x63\x74\x69\x76\x65', !![]);
    }, _0x1e869d['\x67\x65\x74\x4d\x61\x78\x50\x6f\x70\x55\x70\x49\x74\x65\x6d\x54\x65\x78\x74\x4c\x65\x6e\x67\x74\x68'] = function () {
        var _0x5a8df4 = _0x10bb58;
        return this[_0x5a8df4(0x186)][_0x5a8df4(0x191)](_0x5a8df4(0x174), 0xf);
    };
}()));
function _0x221c() {
    var _0xc95333 = [
        '\x71\x67\x6f\x67\x51',
        '\x47\x72\x61\x70\x68\x69\x63\x73\x2e\x77\x69\x64\x74\x68\x20\x2f\x20\x32\x20\x20\x2d\x20\x31\x31\x30',
        '\x4e\x69\x57\x68\x6a',
        '\x67\x6f\x6c\x64\x49\x74\x65\x6d\x54\x65\x78\x74\x43\x6f\x6c\x6f\x72',
        '\x38\x33\x35\x39\x37\x31\x70\x49\x78\x6e\x67\x47',
        '\x39\x31\x32\x34\x34\x35\x47\x62\x7a\x4d\x76\x64',
        '\x55\x64\x4a\x42\x74',
        '\x52\x56\x6b\x67\x5a',
        '\x23\x31\x36\x37\x39\x62\x61',
        '\x67\x65\x74\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x23\x61\x31\x65\x30\x36\x35',
        '\x34\x32\x37\x37\x33\x35\x32\x70\x43\x74\x69\x5a\x64',
        '\x67\x6f\x6c\x64\x49\x74\x65\x6d\x49\x64',
        '\x6b\x42\x62\x55\x77',
        '\x6d\x61\x78\x50\x6f\x70\x49\x74\x65\x6d\x54\x65\x78\x74\x4c\x65\x6e\x67\x74\x68',
        '\x74\x61\x6b\x65\x41\x6c\x6c\x53\x45',
        '\x69\x73\x43\x6c\x6f\x73\x65\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x4f\x6e\x45\x53\x43',
        '\x75\x46\x46\x7a\x6c',
        '\x23\x65\x62\x39\x31\x32\x61',
        '\x23\x64\x65\x61\x37\x31\x32',
        '\x74\x61\x6b\x65\x47\x6f\x6c\x64\x53\x45',
        '\x37\x34\x36\x38\x34\x34\x6a\x73\x41\x48\x68\x6a',
        '\x4a\x4b\x4f\x54\x49',
        '\x47\x72\x61\x70\x68\x69\x63\x73\x2e\x68\x65\x69\x67\x68\x74\x20\x2f\x20\x32\x20\x2d\x20\x31\x38\x30',
        '\x74\x61\x6b\x65\x41\x6c\x6c\x43\x6f\x6d\x6d\x61\x6e\x64\x47\x61\x6d\x65\x70\x61\x64\x4b\x65\x79',
        '\x32\x31\x36\x35\x36\x30\x30\x5a\x59\x73\x75\x71\x43',
        '\x23\x45\x41\x45\x41\x45\x41',
        '\x61\x75\x74\x6f\x43\x6c\x6f\x73\x65\x44\x65\x6c\x61\x79',
        '\x42\x73\x70\x4d\x6b',
        '\x74\x61\x6b\x65\x41\x6c\x6c\x44\x65\x6c\x61\x79',
        '\x67\x65\x74\x54\x61\x6b\x65\x41\x6c\x6c\x43\x6f\x6d\x6d\x61\x6e\x64\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x57\x48\x58\x56\x6e',
        '\x5f\x6c\x6f\x61\x64\x65\x72',
        '\x69\x73\x54\x72\x65\x61\x73\x75\x72\x65\x73\x50\x6f\x70\x55\x70\x41\x63\x74\x69\x76\x65',
        '\x23\x30\x30\x30\x30\x30\x30',
        '\x78\x25\x30',
        '\x69\x73\x41\x75\x74\x6f\x43\x6c\x6f\x73\x65\x41\x6c\x6c\x6f\x77\x65\x64',
        '\x4b\x4c\x70\x74\x6b',
        '\x63\x6c\x6f\x73\x65\x44\x65\x6c\x61\x79',
        '\x74\x6f\x43\x73\x73',
        '\x23\x32\x36\x39\x64\x64\x65',
        '\x57\x75\x49\x73\x47',
        '\x5b\x54\x61\x6b\x65\x20\x41\x6c\x6c\x5d',
        '\x67\x65\x74\x50\x61\x72\x61\x6d',
        '\x31\x37\x36\x32\x39\x33\x69\x70\x79\x77\x77\x56',
        '\x6f\x44\x63\x53\x54',
        '\x31\x30\x36\x32\x30\x34\x37\x6e\x4f\x71\x4a\x46\x55',
        '\x23\x64\x62\x64\x39\x62\x32',
        '\x69\x73\x52\x61\x72\x69\x74\x79\x53\x79\x73\x74\x65\x6d\x41\x63\x74\x69\x76\x65',
        '\x64\x65\x66\x61\x75\x6c\x74\x48\x65\x61\x64\x65\x72',
        '\x50\x4a\x59\x6d\x6b',
        '\x69\x73\x56\x69\x73\x75\x61\x6c\x44\x72\x6f\x70\x41\x63\x74\x69\x76\x65',
        '\x69\x73\x52\x61\x72\x69\x74\x79\x49\x6e\x44\x65\x66\x61\x75\x6c\x74',
        '\x23\x66\x66\x66\x66\x66\x66',
        '\x73\x6c\x69\x63\x65',
        '\x67\x65\x74\x50\x6f\x70\x55\x70\x4c\x69\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x6c\x65\x66\x74',
        '\x36\x68\x6e\x6f\x78\x44\x74',
        '\x69\x74\x65\x6d\x73\x52\x61\x72\x69\x74\x79\x47\x72\x6f\x75\x70',
        '\x67\x65\x74\x56\x69\x73\x75\x61\x6c\x44\x72\x6f\x70\x49\x74\x65\x6d\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x74\x61\x6b\x65\x49\x74\x65\x6d\x53\x45',
        '\x74\x61\x6b\x65\x41\x6c\x6c\x43\x6f\x6d\x6d\x61\x6e\x64\x4b\x65\x79\x62\x6f\x61\x72\x64\x4b\x65\x79'
    ];
    _0x221c = function () {
        return _0xc95333;
    };
    return _0x221c();
}

// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ExtendedLoot;
  _.LoadCompatibilityPatches = function() {
    (function() {
      // * Методы ниже даже не учитываются, если плагин не подключён
      if (Imported.PKD_MapInventory !== true) {
        return;
      }
      (function() {        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ PKD_MI.LIBS.MapChestController.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS___onGainGoldItemProcess, ALIAS___onGainItemFinal;
        if (!PKD_MI.isPro()) {
          return;
        }
        //@[DEFINES]
        _ = PKD_MI.LIBS.MapChestController.prototype;
        
        //@[ALIAS]
        ALIAS___onGainGoldItemProcess = _._onGainGoldItemProcess;
        _._onGainGoldItemProcess = function() {
          // * NO VISUAL DROP (forced)
          $gameTemp._pelLastGainEventId = -1;
          ALIAS___onGainGoldItemProcess.call(this, ...arguments);
          $gameParty.pelOnSomeItemBeenGained();
        };
        //@[ALIAS]
        ALIAS___onGainItemFinal = _._onGainItemFinal;
        _._onGainItemFinal = function() {
          // * NO VISUAL DROP (forced)
          $gameTemp._pelLastGainEventId = -1;
          ALIAS___onGainItemFinal.call(this, ...arguments);
          $gameParty.pelOnSomeItemBeenGained();
        };
      })();
      (function() {        // ■ END PKD_MI.LIBS.MapChestController.coffee
        //---------------------------------------------------------------------------

        //╒═════════════════════════════════════════════════════════════════════════╛
        // ■ PKD_MI.LIBS.MapUserChestController.coffee
        //╒═════════════════════════════════════════════════════════════════════════╛
        //---------------------------------------------------------------------------
        var ALIAS___onStoreItemFinal;
        if (!PKD_MI.isPro()) {
          return;
        }
        
        //@[DEFINES]
        _ = PKD_MI.LIBS.MapUserChestController.prototype;
        
        //@[ALIAS]
        ALIAS___onStoreItemFinal = _._onStoreItemFinal;
        _._onStoreItemFinal = function() {
          // * NO VISUAL DROP (forced)
          $gameTemp._pelLastGainEventId = -1;
          ALIAS___onStoreItemFinal.call(this, ...arguments);
          return $gameParty.pelOnSomeItemBeenGained();
        };
      })();
    })();
    return (function() {      // ■ END PKD_MI.LIBS.MapUserChestController.coffee
      //---------------------------------------------------------------------------
      var __alias_CMGIC;
      if (KDCore.isMZ() && (Imported.VisuMZ_0_CoreEngine || (ColorManager.getItemColor != null))) {
        __alias_CMGIC = ColorManager.getItemColor;
        ColorManager.getItemColor = function(item) {
          var e;
          try {
            // * Чтобы работал цвет команды Take All
            if ((item != null) && (item.pelColor != null)) {
              return item.pelColor;
            } else {
              return __alias_CMGIC.call(this, ...arguments);
            }
          } catch (error) {
            e = error;
            console.warn(e);
            return "#ffffff";
          }
        };
      }
    })();
  };
})();


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Script Calls.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  // * title (extended string)
  window.LL_setHeaderText = function(text) {
    return $gameTemp._pLootListName = text;
  };
  // * name, x, y
  window.LL_setHeaderImage = function() {
    return $gameTemp._pLootListImage = [...arguments];
  };
  
  // * Активировать или выключить Visual Drop в игре
  // (по умолчанию включён (если параметр плагина включён))
  window.VD_setShouldDrop = function(state) {
    if (state === true) {
      $gameSystem._pelNoVSDrop = null;
    } else {
      // * Reversed
      $gameSystem._pelNoVSDrop = true;
    }
  };
  window.VPU_setShouldShow = function(state) {
    if (state === true) {
      $gameSystem._pelNoPopUp = null;
    } else {
      // * Reversed
      $gameSystem._pelNoPopUp = true;
    }
  };
  // * Результат последнего шанса
  window.CH_IsGood = function() {
    return $gameTemp.pelLastChanceIsGood;
  };
})();

// ■ END Script Calls.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__command108, ALIAS__initialize, ALIAS__updateWaitMode, _;
  // * Методы для Loot List

  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  //@[ALIAS]
  ALIAS__command108 = _.command108;
  _.command108 = function(params) {
    if (KDCore.isMV()) {
      this.pCheckELComment(this._params[0]);
    } else {
      this.pCheckELComment(params[0]);
    }
    return ALIAS__command108.call(this, params);
  };
  
  //@[ALIAS]
  ALIAS__initialize = _.initialize;
  _.initialize = function() {
    ALIAS__initialize.call(this, ...arguments);
    this.pInitLootWindow();
  };
  //@[ALIAS]
  ALIAS__updateWaitMode = _.updateWaitMode;
  _.updateWaitMode = function() {
    if (this._waitMode === 'pLootWindow') {
      return this.pUpdateLootWindowWait();
    } else {
      return ALIAS__updateWaitMode.call(this);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var cmd, i, len, pRegisterELGainCommandCodeForChance, ref;
  pRegisterELGainCommandCodeForChance = function(cmd) {
    var alias, commandMethodName;
    commandMethodName = 'command' + cmd;
    alias = Game_Interpreter.prototype[commandMethodName];
    return Game_Interpreter.prototype[commandMethodName] = function() {
      var r;
      if ((this._pItemChance != null) && !this._pIsChanceGood()) {
        return true; // * NOT GAIN ANYTHING (bad chance)
      }
      // * For Visual Drop X,Y
      $gameTemp._pelLastGainEventId = this.eventId();
      r = alias.call(this, ...arguments);
      // * Pop Up
      if (!(PKD_ExtendedLoot.InCollectLootMode() || PKD_ExtendedLoot.IsShouldVisualDrop())) {
        $gameParty.pelOnSomeItemBeenGained();
      }
      return r;
    };
  };
  ref = [125, 126, 127, 128];
  for (i = 0, len = ref.length; i < len; i++) {
    cmd = ref[i];
    pRegisterELGainCommandCodeForChance(cmd);
  }
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _.pInitLootWindow = function() {
    if (Imported.VisuMZ_1_EventsMoveCore && this instanceof Game_CPCInterpreter) {
      return;
    }
    if (typeof $gameTemp === "undefined" || $gameTemp === null) {
      return;
    }
    PKD_ExtendedLoot.InitLootListData();
  };
  _.collectToLootList = function() {
    // * "Собираем" предметы в лут лист
    $gameTemp._pCollectForLootWindow = true;
  };
  _.showLootList = function() {
    // * Теперь gainItem будет работать по стандарту
    $gameTemp._pCollectForLootWindow = false;
    this.pOpenLootWindow();
  };
  //lootList - start
  ///lootList - end
  _.pCheckELLootWindowComment = function(comment) {
    var e;
    try {
      if (!PKD_ExtendedLoot.PP.isLootWindowActive()) {
        return;
      }
      if (!comment.contains("lootList")) {
        return;
      }
      if (comment[0] !== '/') {
        this.collectToLootList();
      } else {
        this.showLootList();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.pInitLootWindow(); // * Сброс
    }
  };
  _.pOpenLootWindow = function() {
    $gameTemp._pLootEventId = this.eventId();
    PKD_ExtendedLoot.OpenLootWindow();
    this.setWaitMode('pLootWindow');
  };
  _.pUpdateLootWindowWait = function() {
    var waiting;
    waiting = PKD_ExtendedLoot.IsLootWindowIsOpen();
    if (!waiting) {
      this._waitMode = '';
      // * Сбрасываем настройки
      this.pInitLootWindow();
    }
    return waiting;
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Interpreter.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Interpreter.prototype;
  _._pIsChanceGood = function() {
    var result;
    if (this._pItemChance == null) {
      return true;
    }
    if (this._pItemChance >= 1) {
      result = true;
    } else if (this._pItemChance <= 0) {
      result = false;
    } else {
      result = KDCore.Utils.isChanceIsGood(this._pItemChance);
    }
    // * Сохранение последнего результата шанса выпадения
    $gameTemp.pelLastChanceIsGood = result;
    this._pItemChance = null; // * Сброс глобального шанса (используется для каждой команды 1 раз)
    return result;
  };
  _.pCheckELComment = function(comment) {
    var e;
    try {
      this.pCheckELChanceComment(comment);
      this.pCheckELGainComment(comment);
      return this.pCheckELLootWindowComment(comment); //?PART
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  
  //chance:X
  //chance:X|S
  //chance:X|V
  _.pCheckELChanceComment = function(comment) {
    var e, value;
    try {
      if (!comment.contains("chance:")) {
        return;
      }
      value = comment.split(":")[1];
      this._pItemChance = this._pOperandELValue(value) / 100;
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._pItemChance = null;
    }
  };
  _._pOperandELValue = function(value) {
    var output, switchId, variableId;
    output = 0;
    if (value.contains("|V")) {
      variableId = parseInt(value);
      output = $gameVariables.value(variableId);
    } else if (value.contains("|S")) {
      switchId = parseInt(value);
      if ($gameSwitches.value(switchId)) {
        output = 100; // * S используется только в Chance, поэтому сразу 100, т.к. деление
      } else {
        output = 0;
      }
    } else {
      output = parseInt(value);
    }
    return output;
  };
  //add:Z:X[|V]:Y[|V]
  // where Z: item, armor, weapon
  // where Z: i, a, w
  //add:item:X|V:Y|V
  // |V from variable
  //add:item:[X,X,X...]:Y[|V]...
  _.pCheckELGainComment = function(comment) {
    var amount, cmd, e, id, itemsArray, itemsList, keywords, singleItem, type;
    try {
      if (!comment.contains("add")) {
        return;
      }
      keywords = comment.split(":");
      if (keywords.length < 4) {
        return;
      }
      type = keywords[1];
      //%[I] Может сделать: вторая цифра (в случае массива) не количество предмета, а сколько из массива предметов выборать
      // * Выборка из массива [X, X, X]
      if (keywords[2].contains("[")) {
        itemsList = keywords[2].substring(1); // * remove [
        itemsList = itemsList.slice(0, -1); // * remove ]
        itemsArray = itemsList.split(",").map(function(i) {
          return i.trim();
        });
        singleItem = itemsArray.sample();
        id = this._pOperandELValue(singleItem);
      } else {
        id = this._pOperandELValue(keywords[2]);
      }
      amount = this._pOperandELValue(keywords[3]);
      // * NOT USED
      //Пример add:w:1:1:withChance(10|V)
      /*if keywords[4]? and keywords[4].contains("withChance")
      pattern = /\((.+)\)/i
      extraChanceValue = pattern.exec(keywords[4])
      if extraChanceValue? and extraChanceValue[1]?
          @_pItemChance = @_pOperandELValue(extraChanceValue[1]) / 100
      else
          console.warn("Try calculate chance to add item in LootList, but something wrong in line: " + keywords[4])*/
      //Пример add:w:1:1:withChance:10|V
      // * withChance
      if (String.any(keywords[4]) && String.any(keywords[5])) {
        try {
          this._pItemChance = this._pOperandELValue(keywords[5]) / 100;
        } catch (error) {
          e = error;
          console.warn("Try calculate chance to add item in LootList, but something wrong in line: " + comment);
          this._pItemChance = 1; // * reset to 1
        }
      }
      if (type[0] === "w") {
        cmd = 127;
      } else if (type[0] === "a") {
        cmd = 128;
      } else {
        cmd = 126;
      }
      // * Тут выполняется через команду, поэтому шанс считается там, если был задан
      this["command" + cmd]([id, 0, 0, amount, false]);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Game_Interpreter.coffee
//---------------------------------------------------------------------------
// * NOT USED
// * Вызывать только с правильным comment
//add:item:[X,X,X...]:Y[|V]
/*_._pCheckELGainCommentFromArray = (comment) ->
try
    keywords = comment.split(":")
    itemsList = keywords[2]
    if itemsList.contains("[") and itemsList.contains("]")
        itemsList = itemsList.substring(1)
        itemsList = itemsList.slice(0, -1)
    itemsArray = itemsList.split(",").map (i) -> i.trim()
    singleItem = itemsArray.sample()
    resultCommand = ["add", keywords[1], singleItem, keywords[3]]
    if String.any(keywords[4]) # * withChance
        resultCommand.push(keywords[4], keywords[5])
    generated = resultCommand.join(":")
    console.log generated
    @pCheckELGainComment(generated) unless generated.contains("from")
catch e
    KDCore.warning e*/


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__setup, _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //@[ALIAS]
  ALIAS__setup = _.setup;
  _.setup = function(mapId) {
    if (this._mapId !== mapId) {
      // * При смене карты, очищаем Visual Drop (если карта другая)
      this.pelClearAllVisualDropItems();
    }
    ALIAS__setup.call(this, ...arguments);
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Map.prototype;
  //%[I]Сделать сохранение предметов при переходах между картами
  _.pelInitVisualDropStorage = function() {
    if (this.__pelVDS == null) {
      return this.pelClearAllVisualDropItems();
    }
  };
  _.pelGetAllVisualDropItems = function() {
    this.pelInitVisualDropStorage();
    return this.__pelVDS;
  };
  _.pelClearAllVisualDropItems = function() {
    return this.__pelVDS = [];
  };
  _.pelAddVisualDropItem = function(vdItem) {
    this.pelInitVisualDropStorage();
    if (vdItem == null) {
      return;
    }
    if (vdItem.isDisposed()) {
      return;
    }
    // * Если уже двигается (то сразу даём, не сохраняем предмет)
    if (vdItem.isMovingToPlayer()) {
      vdItem.gainItem();
    } else {
      this.__pelVDS.push(vdItem.stored());
    }
  };
})();

// ■ END Game_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__gainGold, ALIAS__gainItem, _;
  // * Методы для Loot List

  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__gainGold = _.gainGold;
  _.gainGold = function(amount) {
    if (amount > 0 && PKD_ExtendedLoot.IsValidGoldItem()) {
      if (PKD_ExtendedLoot.InCollectLootMode()) {
        // * Отдельный метод, так как золото "предмет" надо стэкать
        this.pelAddGoldToLootList(amount);
        return;
      } else if (PKD_ExtendedLoot.IsShouldVisualDrop() && $gameTemp._pelLastGainEventId >= 0) {
        this.pelMakeVisualDrop($dataItems[PKD_ExtendedLoot.PP.goldItemId()], amount);
        $gameTemp._pelLastGainEventId = -1;
        return;
      }
    }
    return ALIAS__gainGold.call(this, ...arguments);
  };
  //@[ALIAS]
  ALIAS__gainItem = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    if ((this.itemContainer(item) != null) && amount > 0) {
      if (PKD_ExtendedLoot.InCollectLootMode()) {
        // * Собираем в Loot List
        // * Не нужно сохранять, поэтому передаём сразу предмет
        $gameTemp._pLootListDB.push([item, amount]);
        return;
      } else if (PKD_ExtendedLoot.IsShouldVisualDrop() && $gameTemp._pelLastGainEventId >= 0) {
        this.pelMakeVisualDrop(item, amount);
        $gameTemp._pelLastGainEventId = -1;
        return;
      }
    }
    return ALIAS__gainItem.call(this, ...arguments);
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__gainGoldPU, ALIAS__gainItemPU, _;
  // * Методы для PopUp Items

  //@[DEFINES]
  _ = Game_Party.prototype;
  //@[ALIAS]
  ALIAS__gainGoldPU = _.gainGold;
  _.gainGold = function(amount) {
    var goldItem;
    ALIAS__gainGoldPU.call(this, ...arguments);
    if (PKD_ExtendedLoot.IsValidGoldItem() && amount > 0) {
      goldItem = $dataItems[PKD_ExtendedLoot.PP.goldItemId()];
      this.pelRegisterGainedItem(goldItem, amount);
    }
  };
  //@[ALIAS]
  ALIAS__gainItemPU = _.gainItem;
  _.gainItem = function(item, amount, includeEquip) {
    ALIAS__gainItemPU.call(this, ...arguments);
    this.pelRegisterGainedItem(item, amount);
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.pelRegisterGainedItem = function(item, amount) {
    if (PKD_ExtendedLoot.InCollectLootMode()) {
      return;
    }
    if (amount > 0 && (this.itemContainer(item) != null)) {
      $gameTemp._pelLastItemGainedToParty = [item, amount];
    } else {
      this.pelClearGainedItem();
    }
  };
  _.pelClearGainedItem = function() {
    return $gameTemp._pelLastItemGainedToParty = null;
  };
  _.pelOnSomeItemBeenGained = function() {
    var e;
    if (!PKD_ExtendedLoot.PP.isTreasuresPopUpActive()) {
      return;
    }
    try {
      if ($gameTemp._pelLastItemGainedToParty == null) {
        return;
      }
      if ($gameTemp._pelLastItemGainedToParty[0] == null) {
        return;
      }
      if ($gameTemp._pelLastItemGainedToParty[1] <= 0) {
        return;
      }
      this.pelShowNotifyForItemGain(...$gameTemp._pelLastItemGainedToParty);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    // * Очищаем, так как нет нужды хранить предмет больше
    this.pelClearGainedItem();
  };
  _.pelShowNotifyForItemGain = function(item, amount) {
    var char, e, popUpItem, spriteset;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (amount <= 0) {
        return;
      }
      if (item == null) {
        return;
      }
      // * Специальный флаг, чтобы скрыть Notify
      // * Этот флаг использует Map Inventory (когда снимаешь предмет)
      if ($gameTemp.aaNotNeedItemPopUpNotify === true) {
        return;
      }
      popUpItem = PEL_PopUpItem.CreateWithItem(item, amount);
      spriteset = SceneManager._scene._spriteset;
      if (spriteset == null) {
        return;
      }
      char = spriteset.findTargetSprite($gamePlayer);
      //%[I] Стековать одинаковые предметы? Если поднимаешь одинаковый сразу за предыдущим одинаковым
      return char != null ? char.pelAddTreasurePopUp(popUpItem) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Party.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Party.prototype;
  _.pelAddGoldToLootList = function(amount) {
    var e, goldItem, i, item, len, ref, requireAddNewItem;
    try {
      if (amount <= 0) {
        return;
      }
      goldItem = $dataItems[PKD_ExtendedLoot.PP.goldItemId()];
      goldItem.pelColor = PKD_ExtendedLoot.PP.goldItemTextColor();
      if (goldItem == null) {
        return;
      }
      requireAddNewItem = true;
      ref = $gameTemp._pLootListDB;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item == null) {
          continue;
        }
        if (item[0] == null) {
          continue;
        }
        // * Если уже есть, то увеличиваем количество
        if (item[0].id === goldItem.id) {
          requireAddNewItem = false;
          item[1] += amount;
          break;
        }
      }
      // * Если золота нету, то создаём предмет "золото"
      if (requireAddNewItem === true) {
        //%[I] Можно сделать параметр, чтобы золото НЕ было всегда впереди
        $gameTemp._pLootListDB.unshift([goldItem, amount]);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.pelMakeVisualDrop = function(item, amount) {
    var e, eventId;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      if (!PKD_ExtendedLoot.PP.isVisualDropActive()) {
        return;
      }
      eventId = $gameTemp._pelLastGainEventId;
      if (eventId == null) {
        eventId = 0;
      }
      SceneManager._scene.pCreateVisualDropItem(eventId, item, amount);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END Game_Party.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForPELplugin = function(filename) {
    return this.loadBitmap('img/pExtendedLoot/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


(function (_0x1685b7, _0x1c2986) {
    var _0x2b45ab = _0x3c64, _0x4089cb = _0x1685b7();
    while (!![]) {
        try {
            var _0x3b8e68 = -parseInt(_0x2b45ab(0x18b)) / 0x1 * (parseInt(_0x2b45ab(0x19e)) / 0x2) + -parseInt(_0x2b45ab(0x1a4)) / 0x3 * (parseInt(_0x2b45ab(0x18f)) / 0x4) + -parseInt(_0x2b45ab(0x1af)) / 0x5 * (-parseInt(_0x2b45ab(0x18a)) / 0x6) + -parseInt(_0x2b45ab(0x195)) / 0x7 + parseInt(_0x2b45ab(0x1b3)) / 0x8 + -parseInt(_0x2b45ab(0x1b1)) / 0x9 + parseInt(_0x2b45ab(0x1a0)) / 0xa;
            if (_0x3b8e68 === _0x1c2986)
                break;
            else
                _0x4089cb['push'](_0x4089cb['shift']());
        } catch (_0x42456b) {
            _0x4089cb['push'](_0x4089cb['shift']());
        }
    }
}(_0x442d, 0x8f823), (function () {
    var _0x14f371 = _0x3c64, _0x2cce1b;
    _0x2cce1b = PKD_ExtendedLoot, _0x2cce1b[_0x14f371(0x18e)] = function () {
        return $gameParty['\x70\x65\x6c\x4f\x6e\x53\x6f\x6d\x65\x49\x74\x65\x6d\x42\x65\x65\x6e\x47\x61\x69\x6e\x65\x64']();
    }, _0x2cce1b[_0x14f371(0x192)] = function () {
        var _0x45cf59 = _0x14f371;
        if (_0x45cf59(0x18c) !== '\x4a\x57\x6d\x69\x61') {
            var _0x2537c7;
            return _0x2537c7 = PKD_ExtendedLoot['\x50\x50'][_0x45cf59(0x1ad)](), _0x2537c7 > 0x0 && $dataItems[_0x2537c7] != null;
        } else
            return _0x4069aa[_0x45cf59(0x1b2)] === !![] && _0x1b417a[_0x45cf59(0x1a9)][_0x45cf59(0x18d)]();
    }, _0x2cce1b[_0x14f371(0x1ac)] = function (_0x4fa0df) {
        var _0x5bd6e1 = _0x14f371;
        if (!_0x2cce1b['\x49\x73\x56\x61\x6c\x69\x64\x47\x6f\x6c\x64\x49\x74\x65\x6d']())
            return ![];
        if (_0x4fa0df == null)
            return ![];
        return DataManager['\x69\x73\x49\x74\x65\x6d'](_0x4fa0df) && _0x4fa0df['\x69\x64'] === PKD_ExtendedLoot['\x50\x50'][_0x5bd6e1(0x1ad)]();
    }, _0x2cce1b[_0x14f371(0x19a)] = function () {
        var _0x5b873d = _0x14f371;
        return $gameTemp[_0x5b873d(0x1b2)] === !![] && KDCore[_0x5b873d(0x1a9)][_0x5b873d(0x18d)]();
    }, _0x2cce1b[_0x14f371(0x194)] = function () {
        var _0x778ff = _0x14f371;
        return !this[_0x778ff(0x19a)]() && !this['\x49\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x49\x73\x4f\x70\x65\x6e']() && PKD_ExtendedLoot['\x50\x50'][_0x778ff(0x1a1)]() && $gameSystem[_0x778ff(0x199)] !== !![] && KDCore['\x55\x74\x69\x6c\x73']['\x69\x73\x53\x63\x65\x6e\x65\x4d\x61\x70']();
    }, _0x2cce1b[_0x14f371(0x1a7)] = function () {
        var _0x2d4f0a = _0x14f371;
        $gameTemp[_0x2d4f0a(0x1b2)] = ![], $gameTemp[_0x2d4f0a(0x19c)] = null, $gameTemp['\x5f\x70\x4c\x6f\x6f\x74\x4c\x69\x73\x74\x49\x6d\x61\x67\x65'] = null, $gameTemp[_0x2d4f0a(0x1a3)] = [], $gameTemp['\x5f\x70\x4c\x6f\x6f\x74\x45\x76\x65\x6e\x74\x49\x64'] = 0x0;
    }, _0x2cce1b[_0x14f371(0x197)] = function () {
        var _0x1ac75c = _0x14f371, _0x2ec7fe;
        try {
            return _0x1ac75c(0x196) !== _0x1ac75c(0x196) ? null : SceneManager['\x5f\x73\x63\x65\x6e\x65']['\x70\x4f\x70\x65\x6e\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77']();
        } catch (_0x4e59f9) {
            return _0x2ec7fe = _0x4e59f9, KDCore[_0x1ac75c(0x190)](_0x2ec7fe);
        }
    }, _0x2cce1b['\x49\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x49\x73\x4f\x70\x65\x6e'] = function () {
        var _0x4a3766 = _0x14f371, _0x5f533e;
        try {
            if (_0x4a3766(0x1b4) === _0x4a3766(0x1b4))
                return SceneManager[_0x4a3766(0x1a6)][_0x4a3766(0x193)]();
            else {
                var _0x431fd8;
                try {
                    return _0x2af1fb[_0x4a3766(0x1a6)][_0x4a3766(0x1ab)]();
                } catch (_0x4a4c73) {
                    return _0x431fd8 = _0x4a4c73, _0x1dbc6e['\x77\x61\x72\x6e\x69\x6e\x67'](_0x431fd8);
                }
            }
        } catch (_0x547c88) {
            return _0x5f533e = _0x547c88, KDCore[_0x4a3766(0x190)](_0x5f533e), ![];
        }
    }, _0x2cce1b[_0x14f371(0x19b)] = function () {
        var _0x6b9f40 = _0x14f371;
        if ('\x76\x48\x6b\x41\x48' === _0x6b9f40(0x1b0)) {
            var _0x250f05;
            try {
                return '\x6a\x63\x58\x50\x5a' !== _0x6b9f40(0x1a8) ? SceneManager[_0x6b9f40(0x1a6)][_0x6b9f40(0x19f)]() : (_0x5cf461 = _0x4e72ee, _0x95afd6[_0x6b9f40(0x190)](_0x2742fa));
            } catch (_0x2eb6d5) {
                return _0x250f05 = _0x2eb6d5, KDCore[_0x6b9f40(0x190)](_0x250f05);
            }
        } else
            return _0x383a46 = _0x47390a, _0x1bd10e[_0x6b9f40(0x190)](_0x494e13), ![];
    }, _0x2cce1b['\x47\x65\x74\x49\x74\x65\x6d\x52\x61\x72\x69\x74\x79\x44\x61\x74\x61'] = function (_0x5906e2) {
        var _0x5a7662 = _0x14f371;
        if ('\x54\x51\x47\x7a\x56' !== '\x4d\x65\x42\x67\x6c') {
            var _0x5a6ae1, _0x2f6c8d, _0x300abf;
            if (!PKD_ExtendedLoot['\x50\x50'][_0x5a7662(0x1a5)]())
                return null;
            if (_0x5906e2 == null)
                return null;
            try {
                if (_0x5a7662(0x19d) !== _0x5a7662(0x19d)) {
                    if (_0x4d0c47['\x6d\x65\x74\x61'] != null && _0x48b89c[_0x5a7662(0x1aa)][_0x5a7662(0x1b5)] != null)
                        return _0x4bda03 = _0x47d285(_0x418c13[_0x5a7662(0x1aa)][_0x5a7662(0x1b5)]), _0x113f48 >= 0x1 ? (_0x21e27a = _0x128a53['\x50\x50'][_0x5a7662(0x198)](), _0x278ec0[_0x2a5f24 - 0x1]) : null;
                } else {
                    if (_0x5906e2[_0x5a7662(0x1aa)] != null && _0x5906e2[_0x5a7662(0x1aa)]['\x70\x52\x61\x72\x69\x74\x79'] != null)
                        return _0x5a7662(0x1ae) === _0x5a7662(0x1ae) ? (_0x300abf = parseInt(_0x5906e2[_0x5a7662(0x1aa)][_0x5a7662(0x1b5)]), _0x300abf >= 0x1 ? _0x5a7662(0x191) === '\x4e\x77\x6e\x42\x54' ? (_0x2f6c8d = PKD_ExtendedLoot['\x50\x50'][_0x5a7662(0x198)](), _0x2f6c8d[_0x300abf - 0x1]) : (_0x5f2bd2 = _0x5d560f(_0x47b9db[_0x5a7662(0x1aa)][_0x5a7662(0x1b5)]), _0x880deb >= 0x1 ? (_0x7481cd = _0x2ee803['\x50\x50']['\x67\x65\x74\x49\x74\x65\x6d\x73\x52\x61\x72\x69\x74\x79\x53\x65\x74\x74\x69\x6e\x67\x73'](), _0x3cb99f[_0x3b2190 - 0x1]) : null) : null) : _0x8309fb[_0x5a7662(0x1a2)]();
                }
            } catch (_0x3accf5) {
                return _0x5a6ae1 = _0x3accf5, KDCore[_0x5a7662(0x190)](_0x5a6ae1), null;
            }
        } else
            return _0x3e88f7[_0x5a7662(0x1a6)]['\x70\x49\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x49\x73\x4f\x70\x65\x6e']();
    };
}()));
function _0x3c64(_0x42b685, _0x2d93be) {
    var _0x442da6 = _0x442d();
    return _0x3c64 = function (_0x3c64f1, _0x2d4cdc) {
        _0x3c64f1 = _0x3c64f1 - 0x18a;
        var _0x4abb5d = _0x442da6[_0x3c64f1];
        return _0x4abb5d;
    }, _0x3c64(_0x42b685, _0x2d93be);
}
function _0x442d() {
    var _0x4731ff = [
        '\x6d\x65\x74\x61',
        '\x70\x4f\x70\x65\x6e\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77',
        '\x49\x73\x47\x6f\x6c\x64\x49\x74\x65\x6d',
        '\x67\x6f\x6c\x64\x49\x74\x65\x6d\x49\x64',
        '\x42\x6f\x6d\x6d\x6a',
        '\x31\x36\x38\x32\x32\x33\x30\x72\x79\x53\x73\x4f\x43',
        '\x76\x48\x6b\x41\x48',
        '\x35\x35\x30\x35\x38\x34\x39\x65\x75\x6f\x65\x46\x76',
        '\x5f\x70\x43\x6f\x6c\x6c\x65\x63\x74\x46\x6f\x72\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77',
        '\x32\x37\x36\x31\x36\x36\x34\x46\x56\x56\x66\x77\x61',
        '\x44\x65\x64\x65\x79',
        '\x70\x52\x61\x72\x69\x74\x79',
        '\x31\x38\x70\x64\x67\x51\x4d\x73',
        '\x33\x38\x35\x4f\x74\x4d\x74\x56\x51',
        '\x4a\x48\x6d\x6e\x51',
        '\x69\x73\x53\x63\x65\x6e\x65\x4d\x61\x70',
        '\x53\x68\x6f\x77\x4c\x61\x73\x74\x47\x61\x69\x6e\x50\x6f\x70\x55\x70',
        '\x31\x35\x36\x4d\x49\x44\x44\x71\x41',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x4e\x77\x6e\x42\x54',
        '\x49\x73\x56\x61\x6c\x69\x64\x47\x6f\x6c\x64\x49\x74\x65\x6d',
        '\x70\x49\x73\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77\x49\x73\x4f\x70\x65\x6e',
        '\x49\x73\x53\x68\x6f\x75\x6c\x64\x56\x69\x73\x75\x61\x6c\x44\x72\x6f\x70',
        '\x34\x33\x38\x35\x33\x31\x38\x73\x70\x50\x77\x54\x4b',
        '\x51\x57\x4b\x64\x77',
        '\x4f\x70\x65\x6e\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77',
        '\x67\x65\x74\x49\x74\x65\x6d\x73\x52\x61\x72\x69\x74\x79\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x5f\x70\x65\x6c\x4e\x6f\x56\x53\x44\x72\x6f\x70',
        '\x49\x6e\x43\x6f\x6c\x6c\x65\x63\x74\x4c\x6f\x6f\x74\x4d\x6f\x64\x65',
        '\x43\x6c\x6f\x73\x65\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77',
        '\x5f\x70\x4c\x6f\x6f\x74\x4c\x69\x73\x74\x4e\x61\x6d\x65',
        '\x77\x6c\x50\x64\x57',
        '\x32\x31\x38\x32\x46\x48\x4f\x59\x66\x61',
        '\x70\x43\x6c\x6f\x73\x65\x4c\x6f\x6f\x74\x57\x69\x6e\x64\x6f\x77',
        '\x31\x30\x33\x33\x32\x36\x31\x30\x4e\x72\x4e\x4e\x70\x72',
        '\x69\x73\x56\x69\x73\x75\x61\x6c\x44\x72\x6f\x70\x41\x63\x74\x69\x76\x65',
        '\x70\x65\x6c\x4f\x6e\x53\x6f\x6d\x65\x49\x74\x65\x6d\x42\x65\x65\x6e\x47\x61\x69\x6e\x65\x64',
        '\x5f\x70\x4c\x6f\x6f\x74\x4c\x69\x73\x74\x44\x42',
        '\x31\x30\x39\x30\x32\x6d\x59\x4d\x6e\x6c\x4b',
        '\x69\x73\x52\x61\x72\x69\x74\x79\x53\x79\x73\x74\x65\x6d\x41\x63\x74\x69\x76\x65',
        '\x5f\x73\x63\x65\x6e\x65',
        '\x49\x6e\x69\x74\x4c\x6f\x6f\x74\x4c\x69\x73\x74\x44\x61\x74\x61',
        '\x53\x56\x52\x76\x4a',
        '\x55\x74\x69\x6c\x73'
    ];
    _0x442d = function () {
        return _0x4731ff;
    };
    return _0x442d();
}

// Generated by CoffeeScript 2.6.1
// * Контроллер прикрепляется к спрайту, показывает все Items и удаляется самостоятельно
// * Сам по себе он не "живёт", поэтому нужен начальный popTreasureItem
var PEL_PopUpController;

PEL_PopUpController = class PEL_PopUpController extends Sprite {
  constructor(parentCharacter, popTreasureItem) {
    super();
    this.parentCharacter = parentCharacter;
    this._init();
    if (popTreasureItem != null) {
      this.addItem(popTreasureItem);
    }
    return;
  }

  // * Стандартный набор настроек
  defaultParams() {
    return PKD_ExtendedLoot.PP.getPopUpSettings();
  }

  addItem(popTreasureItem) {
    var e;
    if (popTreasureItem == null) {
      return;
    }
    try {
      if (!this.isEmtpy()) {
        this._moveUpItems();
      }
      this.addChild(popTreasureItem);
      this.items.push(popTreasureItem);
      popTreasureItem.start(this.params);
      KDCore.Utils.playSE(this.params.appearSE);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  isEmtpy() {
    return this.items.isEmpty();
  }

  stop() {
    return this._destroyMe();
  }

  update() {
    super.update();
    this._checkAllItems();
    if (this.isEmtpy()) {
      return this._destroyMe();
    }
  }

};

(function() {  
  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PEL_PopUpController.prototype;
  _._init = function() {
    if (this.params == null) {
      this.params = this.defaultParams();
    }
    this.items = [];
    this._linkMe();
  };
  // * Удалить себя из родителя
  _._destroyMe = function() {
    var e;
    if (this.parentCharacter == null) {
      return;
    }
    try {
      this.parentCharacter.removeChild(this);
      this.visible = false;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Присоединиться к "родителю"
  _._linkMe = function() {
    var e;
    try {
      this.parentCharacter.addChild(this);
      this.move(this.params.margins.x, this.params.margins.y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Поиск и удаление тех item, которые not Active
  _._checkAllItems = function() {
    var e, i, item, len, ref;
    try {
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (!item.isActive()) {
          this.items.delete(item);
          this._checkAllItems(); // * продолжить снова
          break; // * завершить цикл
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Сдвиг элементов
  _._moveUpItems = function() {
    var e, i, item, len, ref;
    try {
      ref = this.items;
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        if (item != null) {
          item.y -= this.params.dyBetweenLines;
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
// * PopUp для предметов и золота (не используется для урона и опыта)
var PEL_PopUpItem;

PEL_PopUpItem = class PEL_PopUpItem extends KDCore.Sprite {
  constructor(params1) {
    super();
    this.params = params1;
    this._isActive = true;
    // * Анимация запущена
    this._isStarted = false;
    this._init();
    return;
  }

  static CreateWithItem(item, amount, params) {
    var popUpItem;
    popUpItem = new PEL_PopUpItem(params);
    popUpItem.setItem(item, amount);
    return popUpItem;
  }

  // * Стандартный набор настроек
  defaultParams() {
    return PKD_ExtendedLoot.PP.getPopUpLineSettings();
  }

  // * Аналог !isDisposed()
  isActive() {
    return this._isActive === true;
  }

  // * Можно ли удалять popUp
  isDisposed() {
    return !this.isActive();
  }

  isStarted() {
    return this._isStarted === true;
  }

  setItem(item, count) {
    var exColor, rarityData;
    if (item == null) {
      return;
    }
    exColor = null;
    this._exIcon = 0;
    if (PKD_ExtendedLoot.IsGoldItem(item)) {
      exColor = PKD_ExtendedLoot.PP.goldItemTextColor();
    } else {
      rarityData = PKD_ExtendedLoot.GetItemRarityData(item);
      if (rarityData != null) {
        exColor = rarityData.color;
        this._exIcon = rarityData.icon;
      }
    }
    this.set(item.name, item.iconIndex, count, exColor);
  }

  // * Задаём данные (текст, иконку, количество)
  // * доп. цвет @exColor - не обязательно
  set(text1, iconIndex, count1, exColor1) {
    var maxLength;
    this.text = text1;
    this.iconIndex = iconIndex;
    this.count = count1;
    this.exColor = exColor1;
    if (!String.any(this.text)) {
      return;
    }
    if (!this.isActive()) {
      return;
    }
    maxLength = PKD_ExtendedLoot.PP.getMaxPopUpItemTextLength();
    if (this.text.length > maxLength) {
      this.text = this.text.slice(0, maxLength) + "...";
    }
    this._createPopItemContent();
  }

  start(effectParams) {
    this.effectParams = effectParams;
    if (!this.isActive()) {
      return;
    }
    this._startEffect();
  }

  // * Завершить работу popUp
  stop() {
    this.opacity = 0;
    this._isStarted = false;
    this._isActive = false;
    this._updateEffect = function() {};
  }

  update() {
    super.update();
    return this._updateEffect();
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PRIVATE.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PEL_PopUpItem.prototype;
  // * Подготовка элемента (проверка параметров)
  _._init = function() {
    var e;
    try {
      if (this.params == null) {
        return this.params = this.defaultParams();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      // * Если произошла ошибка, отключаем элемент
      return this.isActive = function() {
        return false;
      };
    }
  };
  _._createPopItemContent = function() {
    var e;
    try {
      this._createMainText();
      if (this.textSpr == null) {
        return;
      }
      if (Number.prototype.any(this.iconIndex)) {
        this._createIcon();
      }
      if (this.count != null) {
        this._createCountText();
      }
      this._createBackLayer();
      this._applyCenter();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.isActive = function() {
        return false;
      };
    }
  };
  _._createMainText = function() {
    // * Нет try, catch, потому что без основного текста, PopUp не может существовать
    // * Ошибка перехватывается выше и делает isActive = false
    this.textSpr = new KDCore.UI.Sprite_UIText(this.params.text);
    if (String.any(this.exColor)) {
      this.textSpr.drawTextColor(this.text, this.exColor);
    } else {
      this.textSpr.draw(this.text);
    }
    // * Размер текста (нужен для автоцентровки)
    this._textWidth = this._getRealTextWidth(this.textSpr, this.text);
    this.addChild(this.textSpr);
  };
  _._getRealTextWidth = function(textSpr, text) {
    var textWidth;
    textWidth = textSpr._textSpr.bitmap.measureTextWidth(text);
    textWidth += textSpr.x;
    textWidth = Math.round(textWidth);
    return textWidth;
  };
  _._createIcon = function() {
    var e;
    try {
      this.iconSpr = new KDCore.UI.Sprite_UIIcon(this.params.icon);
      this.iconSpr.draw(this.iconIndex);
      this.iconSpr.x -= this.params.icon.size + 1;
      // * Ставим иконку вертикально по центру
      this.iconSpr.y = this.params.text.size.h / 2;
      this.iconSpr.zeroChild().anchor.y = 0.5;
      this.addChild(this.iconSpr);
      // * Дополнительная иконка (если есть)
      if ((this._exIcon != null) && this._exIcon > 0) {
        return this.iconSpr._icon.drawIcon(0, 0, this._exIcon, this.iconSpr.params.size);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createCountText = function() {
    var e, text;
    try {
      this.countTextSpr = new KDCore.UI.Sprite_UIText(this.params.countText);
      text = this.params.countTextStr.replace('%0', this.count);
      this.countTextSpr.draw(text);
      this.countTextSpr.x += this._textWidth + 1;
      // * Не плюсуем, т.к. countTextSpr начинается уже после textSpr (x)
      this._textWidth = this._getRealTextWidth(this.countTextSpr, text);
      return this.addChild(this.countTextSpr);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._createBackLayer = function() {
    var defParams, iconW;
    defParams = JsonEx.parse(JsonEx.stringify(this.params.back));
    iconW = 0;
    if (this.iconSpr != null) {
      iconW += (this.iconSpr.x + 4) * -2;
    }
    if (defParams.size.w <= 0) {
      defParams.size.w = this._textWidth + iconW;
    }
    this._textBack = new KDCore.UI.Sprite_UIRect(defParams);
    this._textBack.x -= iconW - iconW / 4;
    this._textBack.x += this.params.backMargins.x;
    this._textBack.y += this.params.backMargins.y;
    return this.addChildAt(this._textBack, 0);
  };
  _._applyCenter = function() {
    var allWidth;
    allWidth = this._textWidth;
    this.x -= allWidth / 2;
    if (this.iconSpr != null) {
      this.x += this.params.icon.size / 2;
    }
  };
  _._startEffect = function() {
    if (this.effectParams == null) {
      return;
    }
    // * Эффект появления
    this._apperChanger = new KDCore.Changer(this);
    this._apperChanger.change('opacity').from(0).to(255).step(55).start();
    this._nextPhaseThread = new KDCore.TimedUpdate(this.effectParams.stayTime, this._startEndPhase.bind(this));
    this._nextPhaseThread.once();
    this._isStarted = true;
  };
  _._startEndPhase = function() {
    // * Затухание после показа
    this._fadeOutChanger = new KDCore.Changer(this);
    this._fadeOutChanger.change('opacity').from(255).to(0).step(this.effectParams.opacityStep).done(this.stop.bind(this)).start();
    // * Поднятие вверх после показа
    this._moveOutChanger = new KDCore.Changer(this);
    this._moveOutChanger.change('y').from(this.y).to(-Graphics.height - 100).step(this.effectParams.moveStep).done(this.stop.bind(this)).start();
    if (this.effectParams.opacityStep === 0 && this.effectParams.moveStep === 0) {
      // * Если оба параметра равны 0, то уничтожаем сразу
      this.stop();
    }
  };
  _._updateEffect = function() {
    var ref, ref1;
    if (!this.isActive()) {
      return;
    }
    if (!this.isStarted()) {
      return;
    }
    this._apperChanger.update();
    this._nextPhaseThread.update();
    if ((ref = this._fadeOutChanger) != null) {
      ref.update();
    }
    return (ref1 = this._moveOutChanger) != null ? ref1.update() : void 0;
  };
})();

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var VisualDropItem;

VisualDropItem = class VisualDropItem extends KDCore.Sprite {
  constructor(mx, my, itemType, itemId, amount) {
    super();
    this.itemType = itemType;
    this.itemId = itemId;
    this.amount = amount;
    if (!this.isValid()) {
      return;
    }
    if (this.getSettings().flowAnimation.speed > 0) {
      this._flowAnimStep = 0.1;
    }
    this.setStaticPosition(mx, my);
    this._drawVisualItem();
    KDCore.Utils.playSE(this.getSettings().dropItemSE);
    return;
  }

  getSettings() {
    return PKD_ExtendedLoot.PP.getVisualDropSettings();
  }

  // * Позиция (финальная) (в клетках карты)
  setStaticPosition(mx1, my1) {
    this.mx = mx1;
    this.my = my1;
    this.mapPoint = new KDCore.Point(this.mx, this.my);
  }

  // * Данные для сохранения на карте
  stored() {
    return [this.mx, this.my, this.itemType, this.itemId, this.amount];
  }

  isValid() {
    return !this.isDisposed() && (this.item() != null);
  }

  item() {
    if (this.amount <= 0) {
      return null;
    }
    if (this.itemId == null) {
      return null;
    }
    if (this.itemType == null) {
      return null;
    }
    return KDCore.Utils.getItemByType(this.itemId, this.itemType);
  }

  //%[Основной метод нажатия на предмет мышкой]
  onClick() {
    if (this.isInClickLootRadius() && !this.isDisposed()) {
      this.takeUp();
      return true; // * обработан
    } else {
      return false; // * надо идти к объекту
    }
  }

  
    // *  "Взять" предмет (сразу)
  gainItem() {
    if (this.isDisposed()) {
      return;
    }
    KDCore.Utils.playSE(this.getSettings().gainItemSE);
    this._gainItemToParty();
    this.dispose();
  }

  isGold() {
    return PKD_ExtendedLoot.IsGoldItem(this.item());
  }

  isDisposed() {
    return this._disposed === true;
  }

  //%[Основной метод "поднятия" предмета]
  // * "Взять" с анимацией движения
  takeUp() {
    // * Нельзя, пока в анимации прыжка
    if (this.isJumping()) {
      return;
    }
    if (this.getSettings().moveSpeed <= 0) {
      this.gainItem();
    } else {
      this.moveToPlayer();
    }
  }

  // * Когда сцена карты закрывается
  // * disposed можно удалять из "памяти" карты
  dispose() {
    var ref;
    // * Отдать предмет, если анимация была прервана (например вызовом меню)
    if (this.isMovingToPlayer()) {
      this._completeMove();
    }
    this._clearUnderMouseState();
    this._disposed = true;
    this.visible = false;
    if ((ref = this.parent) != null) {
      ref.removeChild(this);
    }
  }

  // * Предмет в радиусе подбора (от игрока) (нажатие)
  isInClickLootRadius() {
    return this.getDistanceToPlayerInPx() <= this.getSettings().clickLootDistanceInPx;
  }

  // * Автоматический радиус подбора (от игрока)
  // * Если 0, то нет автоматического сбора
  isInAutoLootRadius() {
    var dist;
    dist = this.getSettings().autoLootDistanceInPx;
    if (dist > 0) {
      return this.getDistanceToPlayerInPx() <= this.getSettings().autoLootDistanceInPx;
    } else {
      return false;
    }
  }

  getDistanceToPlayerInPx() {
    return $gameMap.distance(this.x, this.y, $gamePlayer.screenX(), $gamePlayer.screenY());
  }

  // * Движение к игроку (анимация)
  // * Используется класс Game_Picture для симуляции движения
  moveToPlayer() {
    this._isMoving = true;
    this._startMoving();
  }

  // * Выполнить прыжок (от точки выпада - случайно в радиусе) (анимация)
  // * Используется класс Game_CharacterBase для симуляции прыжка
  jump() {
    var e, jx, jy, p, randomFromInterval;
    try {
      randomFromInterval = function(min, max) {
        return Math.random() * (max - min) + min;
      };
      this._isJumping = true;
      p = this.getSettings();
      jx = randomFromInterval(p.jumpX.min, p.jumpX.max);
      jy = randomFromInterval(p.jumpY.min, p.jumpY.max);
      if (Math.random() > 0.5) {
        jx *= -1;
      }
      if (Math.random() > 0.5) {
        jy *= -1;
      }
      this._startJumping(jx, jy);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._isJumping = false;
    }
  }

  isJumping() {
    return this._isJumping === true;
  }

  isMovingToPlayer() {
    return this._isMoving === true;
  }

  update() {
    super.update();
    if (this.isDisposed()) {
      return;
    }
    if (this.isJumping()) {
      this._updatePositionJump();
    } else if (this.isMovingToPlayer()) {
      this._updateMoveToPlayer();
    } else {
      this._updatePositionOnScreen();
      if (this._flowAnimStep != null) {
        this._updateUpDownAnimation();
      }
    }
    this._updateAutoLoot();
    if (!this.isDisposed()) {
      this._updateUnderMouseDetection();
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ VisualDropItem.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = VisualDropItem.prototype;
  _._drawVisualItem = function() {
    this._createIcon();
    this._createText();
  };
  _._createIcon = function() {
    var p;
    p = PKD_ExtendedLoot.PP.getVisualDropItemSettings();
    this.iconSpr = new KDCore.UI.Sprite_UIIcon(p.icon);
    this.iconSpr.draw(this.item().iconIndex);
    this.addChild(this.iconSpr);
    this._drawExIcon();
    // * For under mouse
    this.setFrame(0, 0, p.icon.size, p.icon.size);
  };
  _._drawExIcon = function() {
    var e, exIcon, rarityData;
    try {
      rarityData = PKD_ExtendedLoot.GetItemRarityData(this.item());
      if (rarityData != null) {
        exIcon = rarityData.icon;
      }
      // * Дополнительная иконка (если есть)
      if ((exIcon != null) && exIcon > 0) {
        this.iconSpr._icon.drawIcon(0, 0, exIcon, this.iconSpr.params.size);
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._createText = function() {
    var x, y;
    this._textItem = new PEL_VisualDropItemText();
    this._textItem.setItem(this.item(), this.amount);
    this.addChild(this._textItem);
    if (this.getSettings().hintTextOnlyWhenHovered === true) {
      this._textItem.visible = false;
    }
    ({x, y} = this.getSettings().hintTextMargins);
    this._textItem.x += x;
    this._textItem.y += y;
  };
  _._startMoving = function() {
    this._pic = new Game_Picture();
    this._pic._x = this.mx;
    this._pic._y = this.my;
    this._pic._duration = this.getSettings().moveSpeed;
    if (KDCore.isMZ()) {
      this._startMovingMZ();
    } else {
      this._startMovingMV();
    }
  };
  _._startMovingMZ = function() {
    this._pic._wholeDuration = this._pic._duration;
    this._pic._easingType = 3;
    this._pic._easingExponent = 2;
    // * Подмена (упрощение метода)
    this._pic.updateMove = function() {
      if (this._duration > 0) {
        this._x = this.applyEasing(this._x, this._targetX);
        this._y = this.applyEasing(this._y, this._targetY);
        return this._duration--;
      }
    };
  };
  _._startMovingMV = function() {
    // * Подмена (упрощение метода)
    this._pic.updateMove = function() {
      var d;
      if (this._duration > 0) {
        d = this._duration;
        this._x = (this._x * (d - 1) + this._targetX) / d;
        this._y = (this._y * (d - 1) + this._targetY) / d;
        return this._duration--;
      }
    };
  };
  _._startJumping = function(jx1, jy1) {
    this.jx = jx1;
    this.jy = jy1;
    this._char = new Game_CharacterBase();
    this._char.setPosition(this.mx, this.my);
    this._char.jump(this.jx, this.jy);
  };
  _._updatePositionOnScreen = function() {
    var screenPoint;
    screenPoint = this.mapPoint.convertToScreen();
    this.x = screenPoint.x;
    return this.y = screenPoint.y;
  };
  _._updatePositionJump = function() {
    this._char.updateJump();
    this.x = this._char.screenX();
    this.y = this._char.screenY();
    if (!this._char.isJumping()) {
      this._completeJump();
    }
  };
  _._completeJump = function() {
    this.setStaticPosition(this._char._realX, this._char._realY);
    this._isJumping = false;
    this._char = null;
  };
  _._updateMoveToPlayer = function() {
    var point;
    this._pic._targetX = $gamePlayer._realX;
    // * В центр спрайта игрока
    this._pic._targetY = $gamePlayer._realY - 0.5;
    this._pic.updateMove();
    point = new KDCore.Point(this._pic._x, this._pic._y);
    this.x = point.screenX();
    this.y = point.screenY();
    if (this._pic._duration <= 0) {
      this._completeMove();
    }
  };
  _._completeMove = function() {
    this.setStaticPosition(this._pic._x, this._pic._y);
    this._isMoving = false;
    this._pic = null;
    this.gainItem(); // * Дать предмет игроку
  };
  _._gainItemToParty = function() {
    var e, item;
    if (this.itemId == null) {
      return;
    }
    if (this.itemType == null) {
      return;
    }
    if (this.amount <= 0) {
      return;
    }
    try {
      if (this.isGold()) {
        item = null;
        $gameParty.gainGold(this.amount);
      } else {
        item = this.item();
        if (item == null) {
          return;
        }
        $gameParty.gainItem(item, this.amount);
      }
      $gameParty.pelOnSomeItemBeenGained();
      if (Imported.Alpha_ABSZ === true) {
        $gameParty.pOnSomeItemBeenGained();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _._updateAutoLoot = function() {
    if (this.isJumping()) {
      return;
    }
    if (this.isMovingToPlayer()) {
      return;
    }
    if (this.isInAutoLootRadius()) {
      this.takeUp();
    }
  };
  _._updateUpDownAnimation = function() {
    var p;
    p = this.getSettings().flowAnimation;
    this.y = this.y + (p.height * Math.cos(this._flowAnimStep));
    this._flowAnimStep += p.speed;
    if (this._flowAnimStep >= 360) {
      this._flowAnimStep = p.speed;
    }
  };
  _._updateUnderMouseDetection = function() {
    var isUnderMouse, ref;
    isUnderMouse = this.isUnderMouse();
    if (isUnderMouse === true) {
      if ($gameTemp.__pelVisulUnderMouse == null) {
        $gameTemp.__pelVisulUnderMouse = this;
      }
    } else {
      this._clearUnderMouseState();
    }
    if ($gameTemp.__pelVisulUnderMouse === this) {
      if ((ref = this.parent) != null) {
        ref.addChild(this);
      }
    }
    this._updateTextHintVisibility();
  };
  _._clearUnderMouseState = function() {
    if ($gameTemp.__pelVisulUnderMouse === this) {
      return $gameTemp.__pelVisulUnderMouse = null;
    }
  };
  _._updateTextHintVisibility = function() {
    if (this._textItem == null) {
      return;
    }
    if (!this.getSettings().hintTextOnlyWhenHovered) {
      return;
    }
    this._textItem.visible = $gameTemp.__pelVisulUnderMouse === this;
  };
})();

// ■ END VisualDropItem.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PEL_VisualDropItemText;

PEL_VisualDropItemText = class PEL_VisualDropItemText extends PEL_PopUpItem {
  constructor() {
    super(...arguments);
  }

  // * Стандартный набор настроек
  defaultParams() {
    return PKD_ExtendedLoot.PP.getVisualDropItemSettings();
  }

  
    //$[OVER]
  _createIcon() {} // * EMPTY

};


// Generated by CoffeeScript 2.6.1
var PELWindow_LootList;

PELWindow_LootList = class PELWindow_LootList extends Window_Selectable {
  constructor(rect) {
    super(...arguments);
    this.setBackgroundType(2);
  }

  prepareNew() {
    this._shouldTakeAll = false;
    this.isEmptyAtStart = this.isNoItems();
    return this.setBusy(false);
  }

  takeAll() {
    KDCore.Utils.playSE(PKD_ExtendedLoot.PP.takeAllSE());
    this.setBusy(true);
    this._shouldTakeAll = true;
    this._takeAllDelay = PKD_ExtendedLoot.PP.takeAllDelay();
  }

  isBusy() {
    return this._isBusy === true;
  }

  setBusy(_isBusy) {
    this._isBusy = _isBusy;
  }

  maxCols() {
    return 1;
  }

  getSettings() {
    return PKD_ExtendedLoot.PP.getItemListWindowSettings();
  }

  takeItem(index) {
    var e, item;
    try {
      item = this._items[index];
      if (item[0].id === 0) {
        this.takeAll();
        return;
      } else if (PKD_ExtendedLoot.IsGoldItem(item[0])) {
        $gameParty.gainGold(item[1]);
        $gameTemp._pLootListDB.delete(item);
        KDCore.Utils.playSE(PKD_ExtendedLoot.PP.takeGoldSE());
      } else {
        $gameParty.gainItem(item[0], item[1]);
        $gameTemp._pLootListDB.delete(item);
        KDCore.Utils.playSE(PKD_ExtendedLoot.PP.takeItemSE());
      }
      // * Показать всплывающее сообщение
      $gameParty.pelOnSomeItemBeenGained();
      this.refresh();
      try {
        if (index >= this._items.length) {
          this.select(this._items.length - 1);
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        this.select(0);
      }
      this.activate();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  maxItems() {
    if (this._items != null) {
      return this._items.length;
    } else {
      return 0;
    }
  }

  refresh() {
    this._prepareItemsList();
    Window_Selectable.prototype.refresh.call(this);
  }

  drawItem(index) {
    var count, item, itemPair, numberWidth, rect;
    itemPair = this._items[index];
    if (itemPair == null) {
      return;
    }
    if (itemPair[0] == null) {
      return;
    }
    item = itemPair[0];
    rect = this.itemLineRect(index);
    count = itemPair[1];
    // * Тут количество цифр, а не само количество (а то проблемы с золотом)
    numberWidth = this.getCountTextWidthForCount(count.toString().length);
    this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
    if (PKD_ExtendedLoot.IsGoldItem(item)) {
      this.drawGoldNumber(count, rect.x, rect.y, rect.width);
    } else {
      this.drawItemNumber(count, rect.x, rect.y, rect.width);
    }
  }

  getCountTextWidthForCount(count) {
    if (count <= 1) {
      return 0;
    } else {
      return this.textWidth('0'.repeat(count));
    }
  }

  //$[OVER]
  //%[I] Можно добавить изменение размера иконки
  //%[I] Поддержка иконок-картинок (MI) и поддержка Rarity цветов!
  // * Данный метод почти из стандартного drawItemName
  drawItemName(item, x, y, width) {
    var p;
    if (item == null) {
      return;
    }
    p = this.getSettings().listItem;
    this.applyCustomTextSettings(p);
    // * Чтобы внутри стандартного метода применить цвет (если нужно)
    this.__shouldDrawItem = item;
    Window_Selectable.prototype.drawItemName.call(this, ...arguments);
    this.__shouldDrawItem = null;
    this.resetFontSettings();
  }

  drawGoldNumber(count, x, y, width) {
    var text;
    this.applyCustomTextSettings(this.getSettings().goldCount);
    text = this.getSettings().goldCountText.replace('%0', count);
    this.drawText(text, x, y, width, 'right');
    this.resetFontSettings();
  }

  drawItemNumber(count, x, y, width) {
    var text;
    if (count <= 1) {
      return;
    }
    this.applyCustomTextSettings(this.getSettings().itemCount);
    text = this.getSettings().itemCountText.replace('%0', count);
    this.drawText(text, x, y, width, 'right');
    this.resetFontSettings();
  }

  applyCustomTextSettings(p, value) {
    this.changeTextColor(p.color);
    this.applyCustomFont(p.font);
  }

  applyCustomFont(font) {
    if (String.any(font.face)) {
      this.contents.fontFace = font.face;
    }
    this.contents.fontSize = font.size;
    this.contents.fontItalic = font.italic;
  }

  //$[OVER]
  resetFontSettings() {
    super.resetFontSettings();
    this.contents.fontItalic = false;
  }

  //$[OVER]
  resetTextColor() {
    super.resetTextColor();
    return this._applySpecialColorForItem();
  }

  update() {
    super.update();
    if (this._shouldTakeAll === true) {
      this._takeAllProcess();
    }
  }

  isNoItems() {
    return $gameTemp._pLootListDB.length === 0;
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PELWindow_LootList.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PELWindow_LootList.prototype;
  _._prepareItemsList = function() {
    this._items = [];
    //%[I] Показывать кнопку TakeAll если нет преметов?
    this._addCommands();
    return this._addGameItems();
  };
  _._addCommands = function() {
    if (!PKD_ExtendedLoot.PP.isAddTakeAllButton()) {
      return;
    }
    return this._items.push([this._takeAllCommandItem(), 0]);
  };
  _._addGameItems = function() {
    return this._items.push(...$gameTemp._pLootListDB);
  };
  _._takeAllCommandItem = function() {
    var p;
    p = PKD_ExtendedLoot.PP.getTakeAllCommandSettings();
    return {
      id: 0,
      pelColor: p.color,
      iconIndex: p.iconIndex,
      //%[I] Added hotkey to Text %0 (If gamepad then gamepad key)
      //name: p.title.replace('%0', p.quickKeyKeyboard)
      name: p.title,
      // * For VisuMZ compatibility
      note: "",
      meta: {}
    };
  };
  _._applySpecialColorForItem = function() {
    if (this.__shouldDrawItem == null) {
      return;
    }
    if (String.any(this.__shouldDrawItem.pelColor)) {
      this.changeTextColor(this.__shouldDrawItem.pelColor);
    }
  };
  _._takeAllProcess = function() {
    if (this.isNoItems()) {
      this.setBusy(false);
      this._shouldTakeAll = false;
      this.select(0);
      this.activate();
    } else {
      this._takeAllDelay--;
      if (this._takeAllDelay <= 0) {
        this.select(-1);
        this.takeItem(this._items.length - 1);
        this.deactivate();
        this._takeAllDelay = PKD_ExtendedLoot.PP.takeAllDelay();
      }
    }
  };
})();

// ■ END PELWindow_LootList.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PELWindow_LootMain;

PELWindow_LootMain = class PELWindow_LootMain extends KDCore.FloatingWindow {
  constructor() {
    super(...arguments);
    this.loadHotKeys();
  }

  rootImageFolder() {
    return "pExtendedLoot";
  }

  getSettings() {
    return PKD_ExtendedLoot.PP.getLootWindowSettings();
  }

  closeButtonPosition() {
    return this.getSettings().closeButtonPosition;
  }

  realWidth() {
    return this.getSettings().mainWindowSize.w;
  }

  realHeight() {
    return this.getSettings().mainWindowSize.h;
  }

  getEvaluatedPositionFromSettings(index) {
    var e, posValue;
    try {
      if (index === 0) {
        index = 'x';
      } else {
        index = 'y';
      }
      posValue = this.getSettings().position[index];
      return eval(posValue);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return 0;
    }
  }

  // * Сдвинуть позицию окна с учётом позиции события (если есть опция) (координаты экрана)
  moveByRelativePosition(x, y) {
    var h2, sector, w2;
    // Screen sectors
    // 1 | 2
    // 3 | 4
    // ==============
    sector = 1;
    w2 = Graphics.width / 2;
    h2 = Graphics.height / 2;
    
    // * Определяем сектор экрана, на котромнаходится элемент
    if (x < w2) {
      if (y < h2) {
        sector = 1;
      } else {
        sector = 3;
      }
    } else {
      if (y < h2) {
        sector = 2;
      } else {
        sector = 4;
      }
    }
    
    // * Настраиваем позиции в зависимости от секторов
    if (sector === 3 || sector === 1) {
      this.x = x;
    }
    if (sector === 2 || sector === 4) {
      this.x = x - this.realWidth() + this.getEvaluatedPositionFromSettings(0);
    }
    if (sector >= 3) {
      this.y = y - this.realHeight();
    } else {
      this.y = y + this.getEvaluatedPositionFromSettings(1) + 2;
    }
  }

  moveByAbsolutePosition() {
    this.x = this.getEvaluatedPositionFromSettings(0);
    this.y = this.getEvaluatedPositionFromSettings(1);
  }

  // * Точка открытия в координатах экрана (может быть 0, 0)
  //%[MAIN]
  prepareAndOpenInPoint(x, y) {
    if ((x == null) || this.getSettings().isAbsolutePosition === true) {
      this.moveByAbsolutePosition();
    } else {
      this.moveByRelativePosition(x, y);
    }
    this.applyUserSettings();
    this.refreshItemsList();
    this.open();
  }

  applyUserSettings() {
    var e, name, x, y;
    try {
      if (String.any($gameTemp._pLootListName)) {
        this.headerText.drawText($gameTemp._pLootListName);
      } else {
        this.headerText.drawText("");
      }
      if ($gameTemp._pLootListImage != null) {
        name = $gameTemp._pLootListImage[0];
        x = $gameTemp._pLootListImage[1];
        y = $gameTemp._pLootListImage[2];
        this.setLootWindowHeaderImage(name);
        if ((x != null) && (y != null)) {
          this.headerImage.move(x, y);
        }
      } else {
        this.setDefaultHeaderImage();
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  setDefaultHeaderImage() {
    var p, x, y;
    if (this.headerImage == null) {
      return;
    }
    p = this.getSettings().headerDefaultImage;
    this.setLootWindowHeaderImage(p.name);
    ({x, y} = p.margins);
    this.headerImage.move(x, y);
  }

  setLootWindowHeaderImage(name) {
    if (String.any(name)) {
      this.headerImage.bitmap = ImageManager.loadPictureForPELplugin(name);
      this.headerImage.visible = true;
    } else {
      this.headerImage.visible = false;
    }
  }

  // * Создание списка предметов
  refreshItemsList() {
    if (this.itemsList == null) {
      return;
    }
    this.itemsList.prepareNew();
    this.itemsList.refresh();
    this.itemsList.activate();
    this.itemsList.select(0);
  }

  loadHotKeys() {
    var p;
    p = PKD_ExtendedLoot.PP.takeAllCommandKeyboardKey();
    // * keyboard
    this._takeAllHotKeyA = p.toLowerCase();
    // * gamepad (только стандартные, без KDGamepad)
    this._takeAllHotKeyB = "";
    p = PKD_ExtendedLoot.PP.takeAllCommandGamepadKey().toUpperCase();
    switch (p) {
      case 'A':
        this._takeAllHotKeyB = "ok";
        break;
      //when 'B'
      //@_takeAllHotKeyB = "cancel"
      case 'X':
        this._takeAllHotKeyB = "shift";
        break;
      case 'Y':
        this._takeAllHotKeyB = "menu";
        break;
      case 'LB':
        this._takeAllHotKeyB = "pageup";
        break;
      case 'RB':
        this._takeAllHotKeyB = "pagedown";
        break;
      default:
        this._takeAllHotKeyB = "";
    }
  }

  //$[OVER]
  isDraggable() {
    return this.getSettings().isDraggable === true;
  }

  update() {
    super.update();
    this._updateUserInput();
    return this._updateAutoClose();
  }

  close() {
    // * Нельзя закрыть, если окно в процессе ожидания (take all или delay close)
    if (this.itemsList.isBusy()) {
      return;
    }
    this.itemsList.deactivate();
    return KDCore.FloatingWindow.prototype.close.call(this);
  }

  _createCloseButton() {
    super._createCloseButton();
    if (!this.getSettings().showCloseButton) {
      return this._closeButton.visible = false;
    }
  }

};

(function() {  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ PELWindow_LootMain.coffee
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  //@[DEFINES]
  _ = PELWindow_LootMain.prototype;
  //$[OVER]
  _._createHeader = function() {}; // * EMPTY
  
  //$[OVER]
  _._createCustomElements = function() {
    this._createHeaderImageLayer();
    this._createHeaderText();
    this._createItemsList();
  };
  _._createHeaderImageLayer = function() {
    this.headerImage = new Sprite();
    // * Добавляем на Header (поверх всего)
    this.addChild(this.headerImage);
    this.setDefaultHeaderImage();
  };
  _._createHeaderText = function() {
    var p;
    p = this.getSettings().headerText;
    this.headerText = new KDCore.UI.Sprite_UITextExt(p);
    // * Добавляем на Header (поверх всего) и поверх картинки
    this.addChild(this.headerText);
  };
  _._createItemsList = function() {
    var h, settings, w, x, y;
    settings = PKD_ExtendedLoot.PP.getItemListWindowSettings();
    ({w, h} = settings.listWindowSize);
    ({x, y} = settings.listWindowMargins);
    this.itemsList = new PELWindow_LootList(new Rectangle(x, y, w, h));
    this.itemsList.setHandler('ok', this._onItemListClick.bind(this));
    this.addContent(this.itemsList);
  };
  _._onItemListClick = function() {
    return this.itemsList.takeItem(this.itemsList.index());
  };
  _._updateUserInput = function() {
    if (!this.isOpen()) {
      return;
    }
    if (this.itemsList.isBusy()) {
      return;
    }
    this._updateTakeAllHotKey();
    this._updateCloseByKey();
  };
  _._updateTakeAllHotKey = function() {
    if (Input.isTriggered(this._takeAllHotKeyA) || Input.isTriggered(this._takeAllHotKeyB)) {
      return this.itemsList.takeAll();
    }
  };
  _._updateCloseByKey = function() {
    if (Input.isCancel() && PKD_ExtendedLoot.PP.isCloseLootWindowOnESC()) {
      this.close();
      Input.clear();
      TouchInput.clear();
    }
  };
  _._updateAutoClose = function() {
    if (!this.isOpen()) {
      return;
    }
    if (!PKD_ExtendedLoot.PP.isAutoCloseAllowed()) {
      return;
    }
    // * Если пусто, то нельзя закрыть автоматически
    if (this.itemsList.isEmptyAtStart) {
      return;
    }
    if (this._autoCloseDelay != null) {
      this._autoCloseDelay--;
      if (this._autoCloseDelay === 0) {
        this._autoCloseDelay = null;
        this.itemsList.setBusy(false);
        PKD_ExtendedLoot.CloseLootWindow();
      }
    } else {
      if (this.itemsList.isNoItems()) {
        this._autoCloseDelay = PKD_ExtendedLoot.PP.closeDelay();
        this.itemsList.setBusy(true);
      }
    }
  };
})();

// ■ END PELWindow_LootMain.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createSpriteset, ALIAS__isAnyButtonPressed, ALIAS__onMapLoaded, ALIAS__processMapTouch, ALIAS__stop, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__createSpriteset = _.createSpriteset;
  _.createSpriteset = function() {
    ALIAS__createSpriteset.call(this);
    // * Всегда создаётся
    this._pelVisualDropSpriteset = new Sprite();
    // * Теперь так, чтобы Fadeout и Fadein эффект работали правильно
    this._spriteset._pelVisualDropItemsBase.addChild(this._pelVisualDropSpriteset);
  };
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    ALIAS__onMapLoaded.call(this);
    if (PKD_ExtendedLoot.PP.isLootWindowActive()) {
      this.pPrepareLootWindow();
    }
    if (PKD_ExtendedLoot.PP.isVisualDropActive() || this.pIsAnyVDBeenSaved()) {
      this.pPrepareVisualDrop();
    }
  };
  //@[ALIAS]
  ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
  _.isAnyButtonPressed = function() {
    return ALIAS__isAnyButtonPressed.call(this) || this.pInAnyVDClicked();
  };
  if (KDCore.isMV()) {
    //@[ALIAS]
    ALIAS__processMapTouch = _.processMapTouch;
    _.processMapTouch = function() {
      if (TouchInput.isTriggered() && this.pInAnyVDClicked()) {
        return;
      }
      return ALIAS__processMapTouch.call(this);
    };
  }
  //@[ALIAS]
  ALIAS__stop = _.stop;
  _.stop = function() {
    if (PKD_ExtendedLoot.PP.isVisualDropActive() || this.pIsAnyVDExistsOnMap()) {
      this.pSaveVDItems();
    }
    return ALIAS__stop.call(this);
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //%[FOR TEST PURPOSES]
  _.__pTestVisualDrop = function(eventId, count) {
    var i, item, j, number, ref;
    if (count <= 0) {
      return;
    }
    if (eventId < 0) {
      return;
    }
    for (i = j = 0, ref = count; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      number = KDCore.SDK.rand(7, 30);
      item = $dataItems[number];
      if ((item != null) && String.any(item.name)) {
        this.pCreateVisualDropItem(eventId, item, 1);
      }
      number = KDCore.SDK.rand(7, 30);
      item = $dataArmors[number];
      if ((item != null) && String.any(item.name)) {
        this.pCreateVisualDropItem(eventId, item, 1);
      }
      number = KDCore.SDK.rand(7, 30);
      item = $dataWeapons[number];
      if ((item != null) && String.any(item.name)) {
        this.pCreateVisualDropItem(eventId, item, 1);
      }
      // * Gold
      this.pCreateVisualDropItem(eventId, $dataItems[PKD_ExtendedLoot.PP.goldItemId()], KDCore.SDK.rand(100, 1000));
      this.pCreateVisualDropItem(eventId, $dataItems[PKD_ExtendedLoot.PP.goldItemId()], KDCore.SDK.rand(100, 1000));
    }
  };
  _.pPrepareVisualDrop = function() {
    var d, drops, j, len;
    drops = $gameMap.pelGetAllVisualDropItems();
    for (j = 0, len = drops.length; j < len; j++) {
      d = drops[j];
      if (d == null) {
        continue;
      }
      this.pMakeVisualDropNow(d, false);
    }
    $gameMap.pelClearAllVisualDropItems();
  };
  _.pCreateVisualDropItem = function(eventId, item, amount) {
    var data, event, p, time, type;
    if (amount <= 0) {
      return;
    }
    if (item == null) {
      return;
    }
    if (eventId <= 0) {
      event = $gamePlayer;
    } else {
      event = $gameMap.event(eventId);
    }
    if (event == null) {
      event = $gamePlayer;
    }
    if (event == null) {
      return;
    }
    type = KDCore.Utils.getItemTypeId(item);
    data = [event.x, event.y, type, item.id, amount];
    // * Есть задержка
    p = PKD_ExtendedLoot.PP.getVisualDropSettings().dropDelay;
    if (p.max > 0) {
      time = KDCore.SDK.rand(p.min, p.max);
      setTimeout(function() {
        var e;
        try {
          if (KDCore.Utils.isSceneMap() && !SceneManager.isSceneChanging()) {
            return SceneManager._scene.pMakeVisualDropNow(data);
          }
        } catch (error) {
          e = error;
          return KDCore.warning(e);
        }
      }, time);
    } else {
      this.pMakeVisualDropNow(data);
    }
  };
  _.pMakeVisualDropNow = function(data, withJump = true) {
    var dropItem, e;
    try {
      dropItem = new VisualDropItem(...data);
      if (withJump === true) {
        dropItem.jump();
      }
      return this._pelVisualDropSpriteset.addChild(dropItem);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //%[Метод проверки нажатия мышкой на предмет]
  _.pInAnyVDClicked = function() {
    var underMouse;
    if (!PKD_ExtendedLoot.PP.isVisualDropActive()) {
      return false;
    }
    // * Доп. проверка __pelVisulUnderMouse чтобы не нажимать на "задний" предмет, если друг на друге
    underMouse = this._pelVisualDropSpriteset.children.find(function(i) {
      return i.isUnderMouse() && $gameTemp.__pelVisulUnderMouse === i;
    });
    if (!underMouse && ($gameTemp.__pelVisulUnderMouse != null)) {
      $gameTemp.__pelVisulUnderMouse = null;
    }
    if (underMouse == null) {
      return false;
    }
    return underMouse.onClick();
  };
  _.pSaveVDItems = function() {
    var child, j, len, ref;
    ref = this._pelVisualDropSpriteset.children;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      $gameMap.pelAddVisualDropItem(child);
    }
  };
  _.pIsAnyVDBeenSaved = function() {
    var e;
    try {
      if ((typeof $gameMap !== "undefined" && $gameMap !== null) && ($gameMap.__pelVDS != null)) {
        return $gameMap.__pelVDS.length > 0;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.pIsAnyVDExistsOnMap = function() {
    var e;
    try {
      if ((this._pelVisualDropSpriteset != null) && (this._pelVisualDropSpriteset.children != null)) {
        return this._pelVisualDropSpriteset.children.length > 0;
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.pIsLootWindowIsOpen = function() {
    return (this._pLootWindow != null) && this._pLootWindow.isOpen();
  };
  // * Floating Window требует доп. загрузки (чтобы успеть создать все элементы)
  _.pPrepareLootWindow = function() {
    var h, w;
    ({w, h} = PKD_ExtendedLoot.PP.getLootWindowSettings().mainWindowSize);
    this._pLootWindow = new PELWindow_LootMain(this, w, h);
  };
  _.pOpenLootWindow = function() {
    var e, event, x, y;
    if (this._pLootWindow == null) {
      return;
    }
    x = y = 0;
    try {
      if ($gameTemp._pLootEventId > 0) {
        event = $gameMap.event($gameTemp._pLootEventId);
        if (event != null) {
          x = event.screenX();
          y = event.screenY();
        }
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
      x = y = 0;
    }
    this._pLootWindow.prepareAndOpenInPoint(x, y);
  };
  _.pCloseLootWindow = function() {
    if (this._pLootWindow == null) {
      return;
    }
    this._pLootWindow.close();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Sprite_Character.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Sprite_Character.prototype;
  _.pelAddTreasurePopUp = function(popUpItem) {
    var e;
    if (popUpItem == null) {
      return;
    }
    if (!PKD_ExtendedLoot.PP.isTreasuresPopUpActive()) {
      return;
    }
    try {
      // * Если нету, создаём
      if (this.pelTreasurePopUpEngine == null) {
        return this.pelTreasurePopUpEngine = new PEL_PopUpController(this, popUpItem);
      // * Если есть, но закончился, то пересоздаём
      } else if (this.pelTreasurePopUpEngine.isEmtpy()) {
        this.pelTreasurePopUpEngine.stop();
        return this.pelTreasurePopUpEngine = new PEL_PopUpController(this, popUpItem); // * Добавляем
      } else {
        return this.pelTreasurePopUpEngine.addItem(popUpItem);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Spriteset_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__createDestination, _;
  //@[DEFINES]
  _ = Spriteset_Map.prototype;
  //@[ALIAS]
  ALIAS__createDestination = _.createDestination;
  _.createDestination = function() {
    this._pelVisualDropItemsBase = new Sprite();
    this._pelVisualDropItemsBase.z = 8;
    this._tilemap.addChild(this._pelVisualDropItemsBase);
    ALIAS__createDestination.call(this);
  };
})();

// ■ END Spriteset_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__changeTextColor, ALIAS__drawIcon, ALIAS__drawItemName, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__drawItemName = _.drawItemName;
  _.drawItemName = function(item, x, y, width) {
    var extraIconIndex;
    this.pelCheckRarity(item);
    ALIAS__drawItemName.call(this, ...arguments);
    if (this.___pelIsItemDrawNext === true) {
      this.___pelIsItemDrawNext = false; // * Больше не рисуем спец. предмет
      extraIconIndex = this.___pelRarity.icon;
      if (extraIconIndex > 0) {
        this.drawIcon(extraIconIndex, x, this.___pelIconY);
      }
      this.resetTextColor();
    }
    this.pelClearRarity(); // * Очищаем временные переменны ещё раз
  };
  //@[ALIAS]
  ALIAS__drawIcon = _.drawIcon;
  _.drawIcon = function(icon, x, y) {
    if (this.___pelIsItemDrawNext === true) {
      // * Запоминаем Y координату иконки
      this.___pelIconY = y;
    }
    ALIAS__drawIcon.call(this, ...arguments);
  };
  
  // * Используется changeTextColor вместо resetColor, так как использование resetColor не работает с VisuMz
  //@[ALIAS]
  ALIAS__changeTextColor = _.changeTextColor;
  _.changeTextColor = function() {
    var color;
    ALIAS__changeTextColor.call(this, ...arguments);
    if (this.___pelIsItemDrawNext === true) {
      if (this.___pelRarity == null) {
        return;
      }
      color = this.___pelRarity.color;
      if (String.any(color)) {
        this.contents.textColor = color;
      }
    }
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Window_Base.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  _.pelCheckRarity = function(item) {
    this.___pelIsItemDrawNext = PKD_ExtendedLoot.PP.isDrawRarityInDefaultWindows();
    if (this.___pelIsItemDrawNext === true) {
      this.___pelRarity = PKD_ExtendedLoot.GetItemRarityData(item);
      this.___pelIsItemDrawNext = this.___pelRarity != null;
    }
  };
  _.pelClearRarity = function() {
    this.___pelIsItemDrawNext = false;
    this.___pelRarity = null;
    this.___pelIconY = 0;
  };
})();

// ■ END Window_Base.coffee
//---------------------------------------------------------------------------

//Plugin PKD_ExtendedLoot builded by PKD PluginBuilder 2.1 - 16.04.2022