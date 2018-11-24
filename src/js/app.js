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
        cell1.textContent = parsedarr[i].Line;
        cell2.textContent = parsedarr[i].Type;
        cell3.textContent = parsedarr[i].Name;
        cell4.textContent = parsedarr[i].Condition;
        cell5.textContent = parsedarr[i].Value;
    }
}

