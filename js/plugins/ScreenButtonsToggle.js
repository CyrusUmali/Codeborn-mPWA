(() => {
    // 1. Save original methods
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    const _Scene_Options_create = Scene_Options.prototype.create;
  
    // 2. Add "Screen Buttons" option
    Window_Options.prototype.makeCommandList = function() {
      _Window_Options_makeCommandList.call(this);
      this.addCommand('Screen Buttons', 'screenButtons', !$gameSystem._hideBtns);
    };
  
    // 3. Link the toggle to Galv's system
    Scene_Options.prototype.create = function() {
      _Scene_Options_create.call(this);
      this._optionsWindow.setHandler('screenButtons', this.toggleScreenButtons.bind(this));
    };
  
    // 4. Force buttons to update
    Scene_Options.prototype.toggleScreenButtons = function() {
      $gameSystem._hideBtns = !$gameSystem._hideBtns;
      SceneManager._scene._GButtons.forEach(button => {
        button.opacity = $gameSystem._hideBtns ? 0 : 255; // Immediate visibility change
      });
      this._optionsWindow.refresh();
    };
  })();