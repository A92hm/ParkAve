$.ajaxPrefilter(function(a,b,c){var d;return!a.crossDomain&&(d=$('meta[name="csrf-token"]').attr("content"))?c.setRequestHeader("X-CSRF-Token",d):void 0}),$(function(){});