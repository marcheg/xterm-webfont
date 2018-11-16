var FontFaceObserver = require('fontfaceobserver')

module.exports = {
  apply: function(terminalConstructor) {
    terminalConstructor.prototype.loadWebfontAndOpen = function(element) {
      var _this = this

      var fontFamily = this.getOption('fontFamily')
      var fontWeight = this.getOption('fontWeight')
      var fontWeightBold = this.getOption('fontWeightBold')
      var regular = new FontFaceObserver(fontFamily, { weight: fontWeight }).load()
      var bold = new FontFaceObserver(fontFamily, { weight: fontWeightBold }).load()

      return regular.constructor.all([regular, bold]).then(
        function() {
          _this.open(element)
          return _this
        },
        function() {
          _this.setOption('fontFamily', 'Courier')
          _this.open(element)
          return _this
        }
      )
    }
  }
}
