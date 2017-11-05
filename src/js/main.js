(function(){

    document.addEventListener('DOMContentLoaded', function() {
        var currentKey;
        var throttle = false;
        var alphabet = [];
        currentKey = getNextLetter();
        elem('.letter').innerHTML = currentKey + ' ' + currentKey.toUpperCase();
        speak(currentKey);

        document.onkeypress = function(e) {
            if (e.which !== 0 && !throttle) {
                var result;
                throttle = true;
                if(String.fromCharCode(e.which) === currentKey) {
                    result = getCorrectObject();
                } else {
                   result = getIncorrectObject();
                }
                speak(result.speak);
                elem('.letter').innerHTML = '';
                elem('.app-container').style['background-color'] = result.color;
                setTimeout(function() {
                    elem('.letter').innerHTML = currentKey + ' ' + currentKey.toUpperCase();
                    showNext(result.nextLetter);
                    throttle = false;
                }, 1500);

            }
        };

        function getNextLetter() {
            if(alphabet.length === 0) {
                alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
            }
            var index = Math.floor(Math.random()*alphabet.length);
            var result = alphabet[index];
            alphabet.splice(index, 1);
            return result;
        }

        function showNext(letter) {
            elem('.app-container').style['background-color'] ='blue';
            if(letter) {
                currentKey = letter;
                elem('.letter').innerHTML = currentKey + ' ' + currentKey.toUpperCase();
            }
            speak(currentKey);
        }

        function elem(elemName) {
            if(elemName.indexOf('.') > -1) {
                elemName = elemName.replace('.', '');
                return document.getElementsByClassName(elemName)[0];
            } else {
                return document.getElementsByTagName(elemName)[0];
            }
        }

        function speak(text) {
            if(Modernizr.speechsynthesis){
                var msg = new SpeechSynthesisUtterance();
                msg.lang = 'en-UK';
                msg.text = text;
                window.speechSynthesis.speak(msg);
            }
        }

        function getIncorrectObject() {
            return {
                color: 'red',
                speak: 'Incorrect',
                nextLetter: undefined
            }
        }

        function getCorrectObject() {
            return {
                color: 'green',
                speak: 'Correct',
                nextLetter: getNextLetter()
            }
        }
    });
})();