var realConsoleLog = console.log;
    console.log = function () {
        var message = [].join.call(arguments, " ");
        // Display the message somewhere... (jQuery example)
        $(".output").text(message);
        realConsoleLog.apply(console, arguments);
    };
