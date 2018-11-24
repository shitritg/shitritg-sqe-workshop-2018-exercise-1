import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let table = document.getElementById('res');
        while (table.rows.length > 1)
            table.deleteRow(1);
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        //  var  temp = JSON.stringify(parsedCode);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        showTable(parsedCode);
    });
});

function showTable(parsedarr) {
    let table = document.getElementById('res');
    for (let i = 0; i< parsedarr.length; i++)
    {
        let row = table.insertRow(i+1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = parsedarr[i].Line;
        cell2.innerHTML = parsedarr[i].Type;
        cell3.innerHTML = parsedarr[i].Name;
        cell4.innerHTML = parsedarr[i].Condition;
        cell5.innerHTML = parsedarr[i].Value;
    }
}

