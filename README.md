PhantomJS-Google-Charts-Ruby
===========================

PhantomJS-Google-Charts is a script that turns Google Charts charts into SVG on the server side.

https://github.com/pstephan1187/PhantomJS-Google-Charts

This is a fork of PhantomJS-Google-Charts  that:
    (1) is designed to use the same data syntax that Google shows in its documentation
    (2) is designed to be called from Ruby using the PhantomJS gem:

https://github.com/colszowka/phantomjs-gem

###Usage

Call trigger.js from Ruby like this:

```Ruby
data = {"type" => "PieChart", "options" => {"title" => "Type of Fruit Eaten", "width" => "400", "height" => "300", "is3D" => true, "pieSliceText" => "value"}, "theData" => [['Task', 'Hours per Day'], ['Work', 11], ['Eat', 2], ['Commute', 2], ['Watch TV', 2], ['Sleep', 7]]}.to_json
require 'tempfile'
file = Tempfile.new(['a', '.txt'], "#{Rails.root}/tmp")
file.write(data)
File.chmod(444, file.path)
file.rewind
Phantomjs.run("./path/to/trigger.js", file.path)
```
