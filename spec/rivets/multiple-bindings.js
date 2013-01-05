describe('multiple bindings', function() {
  var model, el, view, binding;
  
  rivets.binders.classes = function (el, value) {
    var elClass = ' ' + el.className + ' ';
    if (elClass.indexOf(' ' + value + ' ') === -1) {
      el.className = el.className + ' ' + value;
    }
    else {
      el.className = elClass.replace(' ' + value + ' ', ' ').trim();
    }
  };
  
  rivets.formatters.replacer = function(value) {
    return 'replaced';
  };
  
  beforeEach(function() {
    rivets.configure({
      preloadData: true,
      adapter: {
        subscribe: function(obj, keypath, callback) {
          obj.on(keypath, callback);
        },
        read: function(obj, keypath) {
          return obj.get(keypath);
        },
        publish: function(obj, keypath, value) {
          attributes = {};
          attributes[keypath] = value;
          obj.set(attributes);
        }
      }
    });
    
    data = new Data({shape: 'square', color: 'red'});
    
    el = document.createElement('div');
    el.setAttribute('data-classes', ' data.color, data.shape | replacer, data.shape');
    view = rivets.bind(el, {data: data});
    binding = view.bindings[0];
  });
  
  it('has clases from multiple attributes', function() {
    expect(el.className).toContain('replaced');
    expect(el.className).toContain('square');
    expect(el.className).toContain('red');
  });
});
