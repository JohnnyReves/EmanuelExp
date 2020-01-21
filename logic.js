var calculateFirstCondDiffenece = {
    type: 'call-function',
    func: function () {
        var sum = 0;
        for (var i = 0; i < firstCondResponses.Negative.length; i++) {
            sum += parseFloat(firstCondResponses.Negative[i]);
        }
        firstCondDiffenece.Negative = (sum / firstCondResponses.Negative.length)- negativeImageAverage;
        sum = 0;
        for (var i = 0; i < firstCondResponses.Positive.length; i++) {
            console.log(sum)
            sum += parseFloat(firstCondResponses.Positive[i]);
        }
        firstCondDiffenece.Positive = (sum / firstCondResponses.Positive.length) - positiveImageAverage;
        console.log(firstCondResponses);
    }
}

var calculateFeedback = function (mean, SD) {
    mean = parseFloat(mean);
    SD = parseFloat(SD);
    var feedback;
    if (mean >= 0) {
        feedback = Math.round(mean + firstCondDiffenece.Positive);
    }
    else if (condition == cond0) { //Moderate
        feedback = Math.round(mean + (0.75 * SD) + firstCondDiffenece.Negative);
    }
    else {
        feedback = Math.round(mean - (0.75 * SD) + firstCondDiffenece.Negative);
    }
    if (feedback > 100) {
        feedback = 100;
    }
    else if (feedback < -100) {
        feedback = -100;
    }
    return feedback;
}