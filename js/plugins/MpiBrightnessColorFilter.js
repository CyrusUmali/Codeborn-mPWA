//==============================================================================
// MpiBrightnessColorFilter
//==============================================================================

/*:
 * @plugindesc 輝度に応じて設定した色に変換するフィルターを適用
 * @author 奏ねこま（おとぶき ねこま）
 * 
 * @param ColorPattern1
 * @type struct<ColorPattern>[]
 * @default ["{\"Red\"😕"11\",\"Green\"😕"25\",\"Blue\"😕"32\",\"TargetBrightness\"😕"0.1125\"}","{\"Red\"😕"47\",\"Green\"😕"105\",\"Blue\"😕"87\",\"TargetBrightness\"😕"0.275\"}","{\"Red\"😕"134\",\"Green\"😕"194\",\"Blue\"😕"112\",\"TargetBrightness\"😕"0.50625\"}","{\"Red\"😕"216\",\"Green\"😕"249\",\"Blue\"😕"177\",\"TargetBrightness\"😕"1.0\"}"]
 * @desc カラーパターン1（適用する色と条件のリスト）
 *
 * @param ColorPattern2
 * @type struct<ColorPattern>[]
 * @default ["{\"Red\"😕"11\",\"Green\"😕"25\",\"Blue\"😕"32\",\"TargetBrightness\"😕"0.1125\"}","{\"Red\"😕"47\",\"Green\"😕"105\",\"Blue\"😕"87\",\"TargetBrightness\"😕"0.275\"}","{\"Red\"😕"134\",\"Green\"😕"194\",\"Blue\"😕"112\",\"TargetBrightness\"😕"0.50625\"}","{\"Red\"😕"216\",\"Green\"😕"249\",\"Blue\"😕"177\",\"TargetBrightness\"😕"1.0\"}"]
 * @desc カラーパターン2（適用する色と条件のリスト）
 *
 * @param ColorPattern3
 * @type struct<ColorPattern>[]
 * @default 
 * @desc カラーパターン3（適用する色と条件のリスト）
 *
 * @param ColorPattern4
 * @type struct<ColorPattern>[]
 * @default 
 * @desc カラーパターン4（適用する色と条件のリスト）
 *
 * @param DefaultColorPatternNo
 * @type number
 * @default 0
 * @desc デフォルトで適用するカラーパターン番号（適用しない場合は0を指定）
 *
 * @help 
 * [概要]
 *  変換元の色の明るさに応じて、予め設定しておいた色に置き換えるプラグインです。
 *  「色の明るさ」とは、グレースケール化したときに白に近いものを「明るい」、黒に
 *  近いものを「暗い」とするもので、本プラグインの説明では「輝度」と表現します。
 *  なお、「一番明るい色の輝度＝1.0」「一番暗い色の輝度＝0.0」とします。
 * 
 * [説明]
 *  予めプラグイン設定の「ColorPattern1」～「ColorPattern4」に変換後の色を設定し
 *  ておきます。ColorPattern1にはサンプルとしてデフォルトで色を設定しています。
 *  以下はサンプルを元にした内容説明となります。
 * 
 *   Red                11
 *   Green              25
 *   Blue               32
 *   TargetBrightness   0.1125
 * 
 *  上記はColorPattern1に設定されている4つの色のうち1つ目の設定内容です。
 *  Red、Green、Blueは変換する色のRGB値です。TargetBrightnessはこの色を適用する
 *  輝度の条件で、「変換前の色の輝度がこの値以下の場合、指定のRGB値の色に変換す
 *  る」という意味になります。まとめると、上記設定内容の場合
 *  「画面上の色のうち輝度が0.1125以下のものをRGB値(11,25,32)の色に置き換える」
 *  という結果となります。
 * 
 *  ColorPattern1のサンプルではこのような設定を4つすることで、画面上の色を4段階
 *  の輝度に分けて4色に変換するような内容となっています。
 * 
 * [プラグインコマンド]
 *  SetBrightnessColorFilter <n>
 * 
 *   <n>で指定した番号のカラーパターンを使用して画面の色を変換します。
 *   【カラーパターン1番を使用する例】
 *     SetBrightnessColorFilter 1
 * 
 *   番号に0を指定すると、画面が元の色に戻ります。
 *   【画面の色を元に戻す】
 *     SetBrightnessColorFilter 0
 * 
 * [DefaultColorPatternNoについて]
 *  ゲーム起動直後から色変換をしたい場合は、プラグイン設定の
 * 「DefaultColorPatternNo」に適用したいカラーパターンの番号を指定してください。
 * 
 * [利用規約] ..................................................................
 *  - 本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  - 商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  - 利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  - プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  - 本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [改訂履歴] ..................................................................
 *   Version 1.00  2018/11/10  初版
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2018 Nekoma Otobuki
 */

 /*~struct~ColorPattern:
 * @param Red
 * @type number
 * @default 255
 * @desc RGB値のR（Red）の値
 * 
 * @param Green
 * @type number
 * @default 255
 * @desc RGB値のG（Green）の値
 * 
 * @param Blue
 * @type number
 * @default 255
 * @desc RGB値のB（Blue）の値
 * 
 * @param TargetBrightness
 * @type string
 * @default 1.0
 * @desc 適用対象ピクセルの輝度
 */

var Imported = Imported || {};
var Makonet = Makonet || {};

(function(){
    'use strict';

    var plugin = 'MpiBrightnessColorFilter';

    Imported[plugin] = true;
    Makonet[plugin] = {};

    var $mpi = Makonet[plugin];
    $mpi.parameters = PluginManager.parameters(plugin);

    $mpi.ColorPattern = [
        '',
        $mpi.parameters['ColorPattern1'],
        $mpi.parameters['ColorPattern2'],
        $mpi.parameters['ColorPattern3'],
        $mpi.parameters['ColorPattern4']
    ].map(function(param) {
        return (param.length > 0) ? JsonEx.parse(param) : null;
    }).map(function(param) {
        return (param) ? param.map(function(data){ return JsonEx.parse(data); }) : null;
    }).map(function(param) {
        if (param) {
            param.forEach(function(data) {
                Object.keys(data).forEach(function(key) {
                    data[key] = Number(data[key]) || 0;
                    if (key !== 'TargetBrightness') {
                        data[key] = parseInt(data[key] / 255 * 10000) / 10000;
                    }
                    data[key] = (data[key] == parseInt(data[key])) ? String(data[key]) + '.0' : String(data[key]);
                });
            });
            param = param.sort(function(a, b) {
                return a.TargetBrightness - b.TargetBrightness;
            });
        }
        return param;
    });

    $mpi.DefaultColorPatternNo = Number($mpi.parameters['DefaultColorPatternNo']) || 0;

    //==============================================================================
    // Private Methods
    //==============================================================================

    function convertVariables(text) {
        if (typeof(text) !== 'string') return text;
        var pattern = '\\\\v\\[(\\d+)\\]';
        while (text.match(RegExp(pattern, 'i'))) {
            text = text.replace(RegExp(pattern, 'gi'), function(){
                return $gameVariables.value(+arguments[1]);
            });
        }
        return text;
    }

    //==============================================================================
    // Create Custom Filter
    //==============================================================================

    PIXI.filters.BrightnessColorFilter = function(ColorPattern) {
        var len = ColorPattern.length;
        var srcText = `
            float condition[${len}];
            vec4 new_color[${len}];
        `;
        ColorPattern.forEach(function(color, index) {
            srcText += `
                condition[${index}] = ${color.TargetBrightness};
                new_color[${index}] = vec4(${color.Red}, ${color.Green}, ${color.Blue}, 1.0);
            `;
        });
        srcText += `
            for (int i = 0; i < ${len}; i++) {
                if (brightness <= condition[i]) {
                    color = new_color[i];
                    break;
                }
            }
        `;
        var fragmentSrc = `
            precision mediump float;
            uniform sampler2D uSampler;
            varying vec2 vTextureCoord;
            void main(void) {
                vec4 color = texture2D(uSampler, vTextureCoord);
                float brightness = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;
                ${srcText}
                gl_FragColor = color;
            }
        `;

        PIXI.Filter.call(this, null, fragmentSrc, {});
    };

    PIXI.filters.BrightnessColorFilter.prototype = Object.create(PIXI.Filter.prototype);
    PIXI.filters.BrightnessColorFilter.prototype.constructor = PIXI.filters.BrightnessColorFilter;

    //==============================================================================
    // Scene_Base
    //==============================================================================
    
    // Scene_Base.prototype.start
    (function(o,p){
        var f=o[p];o[p]=function(){
            f.apply(this,arguments);
            if ($gameScreen) {
                if ((typeof $gameScreen._MBCF_ColorPatternNo) !== 'number') {
                    $gameScreen._MBCF_ColorPatternNo = $mpi.DefaultColorPatternNo;
                }
                var pattern = $mpi.ColorPattern[$gameScreen._MBCF_ColorPatternNo];
                if (pattern) {
                    var filter = new PIXI.filters.BrightnessColorFilter(pattern);
                    var filters = this.filters || [];
                    filters.push(filter);
                    this.filters = filters;
                }
            }
        };
    }(Scene_Base.prototype,'start'));

    //==============================================================================
    // Game_Interpreter
    //==============================================================================

    // Game_Interpreter.prototype.pluginCommand
    (function(o,p){
        var f=o[p];o[p]=function(command, args){
            f.apply(this,arguments);
            if (command.toLowerCase() === 'setbrightnesscolorfilter') {
                var scene = SceneManager._scene;
                var filters = (scene.filters || []).filter(function(filter) {
                    return !(filter instanceof PIXI.filters.BrightnessColorFilter);
                });
                $gameScreen._MBCF_ColorPatternNo = Number(convertVariables(args[0])) || 0;
                var pattern = $mpi.ColorPattern[$gameScreen._MBCF_ColorPatternNo];
                if (pattern) {
                    var filter = new PIXI.filters.BrightnessColorFilter(pattern);
                    filters.push(filter);
                }
                scene.filters = filters;
            }
        };
    }(Game_Interpreter.prototype,'pluginCommand'));
}());