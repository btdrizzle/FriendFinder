const questions = [
    "I prefer to stay in with Netflix than go to the club.",
    "Sense of humor is more important than appearance.",
    "I am high maintenance.",
    "Personal hygiene matters to me.",
    "I like to be spontaneous.",
    "I want to settle down and have a family.",
    "I like to live on the wild side.",
    "Politics matter to me a LOT.",
    "I am open-minded and like to experience new things.",
    "I am creative."
];

const answerChoices = [
    1, 2, 3, 4, 5
];

function createQuestions() {
    let i = 1;
    questions.forEach(question => {
        const div = $('<div>');
        const p = $('<p>');
        p.addClass('lead text-white mb-2');
        p.text(question);
        const select = $('<select>');
        select.addClass('browser-default custom-select');
        select.attr('id', `question${i}`);
        answerChoices.forEach(choice => {
            const option = $('<option>');
            option.attr('value', `${choice}`);
            if (choice === 1) {
                option.text(`${choice}    (agree with least)`);
            } else if (choice === 5) {
                option.text(`${choice}    (agree with most)`);
            } else {
                option.text(`${choice}`);
            }
            select.append(option);
        });
        div.append(p);
        div.append(select);
        div.append('<hr>');
        $('#questions').append(div);
        i++;
    })
}

$('#goToSurvey').on('click', function () {
    window.open('/survey');
});
$('#submit').on('click', function () {
    event.preventDefault();
    $('#modalBody').empty();
    const name = $('#name').val().trim();
    const picUrl = $('#picUrl').val().trim();
    const question1 = parseInt($('#question1 option:selected').val());
    const question2 = parseInt($('#question2 option:selected').val());
    const question3 = parseInt($('#question3 option:selected').val());
    const question4 = parseInt($('#question4 option:selected').val());
    const question5 = parseInt($('#question5 option:selected').val());
    const question6 = parseInt($('#question6 option:selected').val());
    const question7 = parseInt($('#question7 option:selected').val());
    const question8 = parseInt($('#question8 option:selected').val());
    const question9 = parseInt($('#question9 option:selected').val());
    const question10 = parseInt($('#question10 option:selected').val());
    const newPerson = {
        name: name,
        picUrl: picUrl,
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        question5: question5,
        question6: question6,
        question7: question7,
        question8: question8,
        question9: question9,
        question10: question10
    };
    console.log(newPerson);
    $.post("/api/friends", newPerson)
        .then(function (data) {
            console.log(data);
            const h3 = $('<h3>');
            const img = $('<img>');
            h3.text(data.name);
            img.attr('src', data.picUrl);
            $('#modalBody').append(h3);
            $('#modalBody').append(img);
            $('#results').modal();
            //Return page back to default values
            $('#name').val('')
            $('#picUrl').val('')
            $('#question1').val('1');
            $('#question2').val('1');
            $('#question3').val('1');
            $('#question4').val('1');
            $('#question5').val('1');
            $('#question6').val('1');
            $('#question7').val('1');
            $('#question8').val('1');
            $('#question9').val('1');
            $('#question10').val('1');
        });
});

createQuestions();