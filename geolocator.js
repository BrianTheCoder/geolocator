var Geolocator;
Geolocator = function() {
  var html5locate, maxMindlocate, self;
  self = this;
  
  html5locate = function(callback) {
    var locateCallback;
    if (navigator && navigator.geolocation) {
      $(document).data('geolocate', setTimeout(function(){ maxMindlocate(callback); }, 2000));
      navigator.geolocation.getCurrentPosition(function(pos) {
        clearTimeout($(document).data('geolocate'));
        return callback({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude: pos.coords.altitude,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
          accuracy: pos.coords.accuracy
        });
      }, callback, { maximumAge: 1});
      return true;
    }else return false;
  };
  maxMindlocate = function(callback) {
    return $.getScript('http://j.maxmind.com/app/geoip.js', function() {
      return callback({
        latitude: geoip_latitude(),
        longitude: geoip_longitude(),
        city: geoip_city(),
        region: geoip_region(),
        region_name: geoip_region_name(),
        country_name: geoip_country_name(),
        country_code: geoip_country_code(),
        postal_code: geoip_postal_code()
      });
    });
  };
  
  this.locate = function(callback) {
    if (html5locate(callback)) return;
    if (maxMindlocate(callback)) return;
    return callback(null);
  };
};