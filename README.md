## UL Test [![Build Status](https://secure.travis-ci.org/samarpanda/ul-test.svg?branch=master)](http://travis-ci.org/samarpanda/ul-test)

> Google image search result

## Spec

[https://www.google.co.in/search?q=india+flag&es_sm=119&source=lnms&tbm=isch&sa=X&ved=0CAcQ_AUoAWoVChMItv7ez9TSxwIVglKOCh3ZjwU_&biw=1151&bih=701#imgrc=_](https://www.google.co.in/search?q=india+flag&es_sm=119&source=lnms&tbm=isch&sa=X&ved=0CAcQ_AUoAWoVChMItv7ez9TSxwIVglKOCh3ZjwU_&biw=1151&bih=701#imgrc=_)


## Reference

1. [http://stackoverflow.com/questions/7057223/firing-and-capturing-custom-events](http://stackoverflow.com/questions/7057223/firing-and-capturing-custom-events)
2. [http://davidwalsh.name/customevent](http://davidwalsh.name/customevent)
3. [https://css-tricks.com/almanac/properties/p/pointer-events/](https://css-tricks.com/almanac/properties/p/pointer-events/)


## Kill Chrome tabs
ps ux | grep '[C]hrome Helper --type=renderer' | grep -v extension-process | tr -s ' ' | cut -d ' ' -f2 | xargs kill

