//The texts to be presented
const pleaseRespondText = (gender == 'Male') ? 'אנא דרג את הרגש שהתמונה מעוררת בך' : 'אנא דרגי את הרגש שהתמונה מעוררת בך';
const howDidTheyRespondText = function (name) {
    var sentenceEnd = (gender == 'Male') ? 'ידרג את זה?' : 'תדרג את זה';
    return 'איך ' + name + ' ' + sentenceEnd;
};
const howTheyRatedText = function (name) {
    var sentenceEnd = (gender == 'Male') ? 'דרג את זה.' : 'דרגה את זה.';
    return 'כך ' + name + ' ' + sentenceEnd;
};
const thisIsYourResponseText = 'זוהי תשובתך:';
const answerTheQuestions = function (name) {
    var sentenceStart = (gender == 'Male') ? 'אנא ענה ' : 'אנא עני '
    return sentenceStart + 'על השאלות הבאות:';
};
const rateLikablility = function (name) {
    var sentenceEnd = (gender == 'Male') ? ' חביב?' : ' חביבה?';
    return 'עד כמה ' + name + sentenceEnd;
};
const rateTrustworthiness = function (name) {
    var sentenceEnd = (gender == 'Male') ? ' אמין?' : ' אמינה?';
    return 'עד כמה ' + name + sentenceEnd;
};
const rateCompenetce = function (name) {
    var sentenceEnd = (gender == 'Male') ? ' כשיר?' : ' כשירה?';
    return 'עד כמה ' + name + sentenceEnd;
};

//Fixation slide
var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="position: absolute; top:50%; left:50%; transform: translate(-50%,-50%);">' +
        '<span style="font-size: 200px"><b>+</b></span>' +
        '</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 750,
    post_trial_gap: 500,
    data: {test_part: 'fixation'}
};

var firstCond = function (ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj['index'] + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: pleaseRespondText,
                    slider: true,
                    locked: false,
                    key_press: 'space',
                    require_response: true
                }
            ],
            labels: ['-100', '100'],
            max: 100, min: -100,
            data: function () {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                }
            },
            post_trial_gap: 1000,
            on_finish: function (data) {
                firstCondResponses[data.Valence].push(data.response[1].slider);
            }
        }]
    };
};
    

var selfCond = function (ExpObj) {
    return {
        timeline: [fixation,{
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.index + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: pleaseRespondText,
                    slider: true,
                    locked: false,
                    key_press: 'space',
                    require_response: true
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: 1000
                },
                {
                    text: thisIsYourResponseText,
                    slider: true,
                    locked: true,
                    key_press: 'space',
                    slider_color: 'red',
                    start: '$1$'
                },
            ],
            labels: ['-100', '100'],
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]}
};


var otherCond = function (ExpObj) {
    return {
        timeline: [fixation, {
            type: 'html-slider-response-modified',
            stimulus: function () {
                return '<div style="margin: auto;">' +
                    '<img src="stimuli/' + ExpObj.index + '.jpg" style="width: 500px;" />' +
                    '</div>';
            },
            blocks: function () {
                return [
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: PRE_TRIAL_BREAK
                    },
                    {
                        text: howDidTheyRespondText(ExpObj.name),
                        slider: true,
                        locked: false,
                        key_press: 'space',
                        require_response: true
                    },
                    {
                        text: '',
                        slider: false,
                        locked: false,
                        duration: 1000
                    },
                    {
                        text: howTheyRatedText(ExpObj.name),
                        slider: true,
                        locked: true,
                        key_press: 'space',
                        slider_color: 'red',
                        start: calculateFeedback(ExpObj.mean, ExpObj.SD)
                    },
                ]
            },
            labels: ['-100', '100'],
            max: 100, min: -100,
            post_trial_gap: 1000,
            data: function () {
                return {
                    Image: ExpObj.index,
                    Valence: parseFloat(ExpObj.mean) > 0 ? 'Positive' : 'Negative'
                };
            }
        }]
    };
};


var stage3ShowImage = function (ImageInd, ImageMean, ImageSD, Name, PersonCond) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                '<img src="stimuli/' + ImageInd + '.jpg" style="width: 500px;" />' +
                '</div>';
        },
        blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: howTheyRatedText(Name),
                    slider: true,
                    locked: true,
                    start: calculateFeedback(ImageMean, ImageSD, PersonCond),
                    key_press: 'space',
                    require_response: false,
                }
            ],
        labels: ['-100', '100'],
        max: 100, min: -100,
        post_trial_gap: 1000,
        data: function () {
            return {
                trial_type: 'Stage 3 Show Images'
            };
        }
    }
};


var Stage3RateThisPerson = function (Name) {
    return {
        type: 'html-slider-response-modified',
        stimulus: function () {
            return '<div style="margin: auto;">' +
                answerTheQuestions(Name) +
                '</div>';
        },
        blocks: [
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateLikablility(Name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateTrustworthiness(Name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                },
                {
                    text: '',
                    slider: false,
                    locked: false,
                    duration: PRE_TRIAL_BREAK
                },
                {
                    text: rateCompenetce(Name),
                    slider: true,
                    locked: false,
                    start: 50,
                    key_press: 'space',
                    require_response: false
                }
            ],
        labels: ['בהחלט', 'כלל לא'],
        max: 100, min: 0,
        post_trial_gap: 1000,
        slider_dir: 'rtl',
        data: function () {
            return {
                Person: Name,
            };
        }
    }
};


var stage3SinglePerson = function (Person) {
    var finalArray = [fixation];
    for (var i = 0; i < Person.images.length; i++) {
        var cur = Person.images[i];
        finalArray.push(stage3ShowImage(cur.index, cur.mean, cur.SD, Person.name, Person.cond));
    }
    finalArray.push(Stage3RateThisPerson(Person.name));
    return {
        timeline: finalArray
    }
};

