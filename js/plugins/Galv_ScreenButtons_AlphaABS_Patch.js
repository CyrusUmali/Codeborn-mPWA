//-----------------------------------------------------------------------------
// Alpha ABS Z + Galv's Screen Buttons Integration
//-----------------------------------------------------------------------------

// This extension creates compatibility between Galv's Screen Buttons
// and Alpha ABS Z by Kaizen Gamedev (formerly Kage Desu)

(function() {
    // Store the original addButton function
    var _original_addButton = Galv.SBTNS.addButton;
    
    // Create an extension of the key press/release functions that will work with Alpha ABS Z
    Galv.SBTNS.absKeyPress = function(key) {
        // Standard key press simulation
        Galv.SBTNS.keyPress(key);
        
        // Alpha ABS Z compatibility - trigger a keydown event
        if(window.AlphaABS && window.AlphaABS.Input) {
            // Direct integration with AlphaABS.Input if available
            var keyCode = Galv.SBTNS.getKeyCode(key);
            if(keyCode) {
                if(AlphaABS.Input.isKeyPressedManual) {
                    AlphaABS.Input.isKeyPressedManual(keyCode, true);
                }
                
                // Create and dispatch a synthetic keyboard event
                var event = new KeyboardEvent('keydown', {
                    'key': key,
                    'code': 'Key' + key.toUpperCase(),
                    'keyCode': keyCode,
                    'which': keyCode,
                    'bubbles': true,
                    'cancelable': true
                });
                document.dispatchEvent(event);
            }
        }
    };
    
    Galv.SBTNS.absKeyRelease = function(key) {
        // Standard key release
        Galv.SBTNS.keyRelease(key);
        
        // Alpha ABS Z compatibility - trigger a keyup event
        if(window.AlphaABS && window.AlphaABS.Input) {
            var keyCode = Galv.SBTNS.getKeyCode(key);
            if(keyCode) {
                if(AlphaABS.Input.isKeyPressedManual) {
                    AlphaABS.Input.isKeyPressedManual(keyCode, false);
                }
                
                // Create and dispatch a synthetic keyboard event
                var event = new KeyboardEvent('keyup', {
                    'key': key,
                    'code': 'Key' + key.toUpperCase(),
                    'keyCode': keyCode,
                    'which': keyCode,
                    'bubbles': true,
                    'cancelable': true
                });
                document.dispatchEvent(event);
            }
        }
    };
    
    // New action type for Alpha ABS Z keys
    Galv.SBTNS.createButton = function(obj) {
        if (!obj) return;
        var index = obj.id;

        if (!Galv.SBTNS.canHasButton(index)) return;
        this.removeChild(this._GButtons[index]);

        this._GButtons[index] = new Sprite_GButton(obj);

        if (obj.action) {
            var type = obj.action[0];
            var data = obj.action[1];
            
            switch (type) {
                case 'button':    // for button press emulation
                    var button = data;
                    this._GButtons[index].setPressHandler(Galv.SBTNS.btnPress.bind(this,data));
                    this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this,data));
                    break;
                case 'buttonT':    // for button trigger emulation
                    var button = data;
                    this._GButtons[index].setPressHandler(Galv.SBTNS.btnTrigger.bind(this,data));
                    this._GButtons[index].setClickHandler(Galv.SBTNS.btnRelease.bind(this,data));
                    break;
                case 'script':    // for script calls
                    var script = data;
                    this._GButtons[index].setClickHandler(this.gButtonScript.bind(this,data));
                    break;
                case 'event':     // for common event
                    this._GButtons[index].setClickHandler(Galv.SBTNS.runGCommentEvent.bind(this,data));
                    break;    
                case 'key':    // for keyboard key press emulation
                    var key = data;
                    this._GButtons[index].setPressHandler(Galv.SBTNS.keyPress.bind(this,key));
                    this._GButtons[index].setClickHandler(Galv.SBTNS.keyRelease.bind(this,key));
                    break;
                case 'abskey':    // NEW: for Alpha ABS Z key press emulation
                    var key = data;
                    this._GButtons[index].setPressHandler(Galv.SBTNS.absKeyPress.bind(this,key));
                    this._GButtons[index].setClickHandler(Galv.SBTNS.absKeyRelease.bind(this,key));
                    break;
            }
        }
        this.addChild(this._GButtons[index]);
    };
})();
