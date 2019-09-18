function deleteAllHyperlinks() {
  var presentationId = '1dfpeafq2hHdTTAG_g2yD7XN3Mpr1iye_88R3e2rbJOM';
  var presentation = Slides.Presentations.get(presentationId);
  var slides = presentation.slides;
  
  var reqs = [];

  slides.forEach(function(slide) {
    slide.pageElements.forEach(function(pageElement){
      var textElements = pageElement.shape.text.textElements;
      if(textElements){
        textElements.forEach(function(textElement){
          if(textElement.textRun){
            if(textElement.textRun.style.link){
              var uts = {};
              
              uts.objectId = pageElement.objectId;
              uts.textRange = {};
              if(textElement.startIndex && textElement.endIndex){
                uts.textRange.startIndex = textElement.startIndex;
                uts.textRange.endIndex = textElement.endIndex;
                uts.textRange.type = 'FIXED_RANGE';
              } else {
                uts.textRange.type = 'ALL';
              }
              
              uts.fields = 'link';
              
              reqs.push({updateTextStyle: uts});
            }
          }
        });
      }
    });
  });
  
  Slides.Presentations.batchUpdate({requests: reqs}, presentationId);
}