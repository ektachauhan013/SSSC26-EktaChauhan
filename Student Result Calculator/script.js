function calculateResult(){

    const name = document.getElementById("studentName").value.trim();

    const marks = [
        Number(document.getElementById("sub1").value),
        Number(document.getElementById("sub2").value),
        Number(document.getElementById("sub3").value),
        Number(document.getElementById("sub4").value),
        Number(document.getElementById("sub5").value)
    ];

    const resultBox = document.getElementById("result");

    if(name.length === 0){

        resultBox.innerHTML = `
            <div class="error">
                Student name cannot be empty.
            </div>
        `;

        return;
    }

    for(let i = 0; i < marks.length; i++){

        if(isNaN(marks[i])){

            resultBox.innerHTML = `
                <div class="error">
                    Subject ${i + 1} marks cannot be empty.
                </div>
            `;

            return;
        }

        if(marks[i] < 0 || marks[i] > 100){

            resultBox.innerHTML = `
                <div class="error">
                    Subject ${i + 1} marks must be between 0 and 100.
                </div>
            `;

            return;
        }
    }

    let total = 0;

    for(let i = 0; i < marks.length; i++){
        total += marks[i];
    }

    let average = total / marks.length;

    let percentage = (total / 500) * 100;

    // Overall Grade
    let overallGrade = "";

    if(percentage >= 90){
        overallGrade = "A+";
    }
    else if(percentage >= 80){
        overallGrade = "A";
    }
    else if(percentage >= 70){
        overallGrade = "B";
    }
    else if(percentage >= 50){
        overallGrade = "C";
    }
    else{
        overallGrade = "Fail";
    }

    let subjectGrades = "";

    for(let i = 0; i < marks.length; i++){

        let grade = "";

        if(marks[i] >= 92.5 && marks[i] <= 100){
            grade = "10 Grade";
        }
        else if(marks[i] >= 84.5 && marks[i] < 92.5){
            grade = "9 Grade";
        }
        else if(marks[i] >= 76.5 && marks[i] < 84.5){
            grade = "8 Grade";
        }
        else if(marks[i] >= 68.5 && marks[i] < 76.5){
            grade = "7 Grade";
        }
        else if(marks[i] >= 60.5 && marks[i] < 68.5){
            grade = "6 Grade";
        }
        else if(marks[i] >= 52.5 && marks[i] < 60.5){
            grade = "5 Grade";
        }
        else if(marks[i] >= 44.5 && marks[i] < 52.5){
            grade = "4 Grade";
        }
        else{
            grade = "Back";
        }

        subjectGrades += `
            <div class="subject-grade">
                <span>Subject ${i + 1}</span>
                <span>${marks[i]} Marks</span>
                <span>${grade}</span>
            </div>
        `;
    }

    let day = document.getElementById("day").value;

    let message = "";

    switch(day){

        case "Monday":
        message = "Start strong and stay focused.";
        break;

        case "Tuesday":
        message = "Consistency creates success.";
        break;

        case "Wednesday":
        message = "You are improving every day.";
        break;

        case "Thursday":
        message = "Keep working toward your goals.";
        break;

        case "Friday":
        message = "Finish the week with confidence.";
        break;

        case "Saturday":
        message = "Use weekends to sharpen your skills.";
        break;

        case "Sunday":
        message = "Rest well and prepare for a fresh start.";
        break;
    }

    resultBox.innerHTML = `

        <div class="result-card">

            <h3>${name}'s Result</h3>

            <div class="subject-list">
                ${subjectGrades}
            </div>

            <div class="result-summary">

                <p><strong>Total Marks:</strong> ${total}</p>

                <p><strong>Average:</strong> ${average.toFixed(2)}</p>

                <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>

                <p class="grade">
                    Overall Grade : ${overallGrade}
                </p>

            </div>

            <div class="message">
                ${message}
            </div>

        </div>
    `;
}