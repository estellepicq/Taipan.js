/**
* @namespace
*/
var TAIPAN = {

  /**
  * @author Ludovic Cluber <http://www.lcluber.com/contact>
  * @file Finite State Machine library.
  * @version 0.2.1
  * @copyright (c) 2011 Ludovic Cluber

  * @license
  * MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  */

  revision: '0.2.1',

  /**
  * Create a new finite state machine.
  * @since 0.2.0
  * @method
  * @param {array} config An array of actions describing the state machine. [{ name: 'action',    from: 'status1',    to: 'status2' }]
  * @returns {fsm}  The new finite state machine
  */
  create : function( config ){
    var _this = Object.create(this);
    _this.states = this.createStates(config);
    _this.createEvents(config);
    return _this;
  },

  // create the states from the config array (paused, playing)
  createStates: function(config) {

    var states = {};
    for (var i = 0 ; i < config.length ; i++) {
      var event = config[i];
      if (!states.hasOwnProperty(event.from)) {
        states[event.from] = (i) ? false : true;
      }
      if (!states.hasOwnProperty(event.to)) {
        states[event.to] = false;
      }
    }
    return states;
    
  },

  createEvents : function(config) {
    for (var i = 0 ; i < config.length ; i++) {
      var event = config[i];
      if (!this.hasOwnProperty(event.name)) {
        this[event.name] = this.setStatus(event.from, event.to);
      }
    }
    
  },

  /**
  * Get finite state machine status
  * @since 0.2.0
  * @method
  * @returns {string}  The status of the finite state machine
  */
  getStatus : function(){
    for (var property in this.states) {
      if (this.states[property] === true) {
        return property;
      }
    }
    return false;
  },

  setStatus : function( from, to ){
    return function(){
      if ( this.states[from] === true ){
        this.states[from] = false;
        this.states[to]   = true;
        return true;
      }
      return false;
    };
  },

};
