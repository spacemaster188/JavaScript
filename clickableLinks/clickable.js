  function replacer(str) {
    return "<a href='" + str + "' target='_blank'>" + str + "</a>";
  }
  var text = '<c:out value="${Your text}" />';
  text = text.replace(/http:\/\/[^ ]+/, replacer);
  document.write(text);