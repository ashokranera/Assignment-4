    var students = [];
    var currentRow = -1;

    function validateForm() {
        var name = document.forms["RegForm"]["Name"];
        var surname = document.forms["RegForm"]["Surname"];
        var gender = document.forms["RegForm"]["gender"];
        var maths = document.forms["RegForm"]["Maths"];
        var science = document.forms["RegForm"]["Science"];
        var sociology = document.forms["RegForm"]["Sociology"];
        var english = document.forms["RegForm"]["English"];
        var hindi = document.forms["RegForm"]["Hindi"];

        if (name.value == "") {
            window.alert("Please enter your name.");
            name.focus();
            return false;
        }

        if (surname.value == "") {
            window.alert("Please enter your Surname.");
            surname.focus();
            return false;
        }

        if (maths.value == "") {
            window.alert("Please enter your Maths Mark.");
            maths.focus();
            return false;
        }

        if (science.value == "") {
            window.alert("Please enter your Science Mark .");
            science.focus();
            return false;
        }

        if (sociology.value == "") {
            window.alert("Please enter your Sociology Mark .");
            sociology.focus();
            return false;

        }

        if (hindi.value == "") {
            window.alert("Please enter your Hindi Mark .");
            hindi.focus();
            return false;
        }

        return true;
    }

    function getObj() {
        var name = document.forms["RegForm"]["Name"];
        var surname = document.forms["RegForm"]["Surname"];
        var gender = document.forms["RegForm"]["gender"];
        var maths = document.forms["RegForm"]["Maths"];
        var science = document.forms["RegForm"]["Science"];
        var sociology = document.forms["RegForm"]["Sociology"];
        var english = document.forms["RegForm"]["English"];
        var hindi = document.forms["RegForm"]["Hindi"];

        var genderVal;
        for (var i = 0; i < gender.length; i++) {
            if (gender[i].checked)
                genderVal = gender[i].value;
        }

        return {
            name: name.value,
            surname: surname.value,
            gender: genderVal,
            maths: maths.value,
            science: science.value,
            sociology: sociology.value,
            english: english.value,
            hindi: hindi.value
        };
    }

    function addNew() {
        if (!validateForm()) return;
        currentRow = students.push(getObj());
        currentRow--;
        refreshTable();
    }

    function saveRecord() {
        if (!validateForm()) return;
        if (currentRow === undefined) {
            alert("Please select record to save or add new");
            return;
        }
        students[currentRow] = getObj();
        refreshTable();
    }

    function next() {
        currentRow = (currentRow + 1) % students.length;
        refreshForm();
        refreshTable();
    }

    function previous() {
        currentRow--;
        if (currentRow < 0) {
            currentRow = students.length - 1;
        }
        refreshForm();
        refreshTable();
    }

    function refreshForm() {
        if (students.length == 0) {
            resetForm();
            return;
        }
        if (students[currentRow] == undefined) return;
        document.forms["RegForm"]["Name"].value = students[currentRow].name;
        document.forms["RegForm"]["Surname"].value = students[currentRow].surname;
        document.forms["RegForm"]["gender"].value = students[currentRow].gender;
        document.forms["RegForm"]["Maths"].value = students[currentRow].maths;
        document.forms["RegForm"]["Science"].value = students[currentRow].science;
        document.forms["RegForm"]["Sociology"].value = students[currentRow].sociology;
        document.forms["RegForm"]["English"].value = students[currentRow].english;
        document.forms["RegForm"]["Hindi"].value = students[currentRow].hindi;
    }

    function resetForm() {
        document.forms["RegForm"].reset();
    }

    function deleteRecord() {
        if (currentRow > -1) {
            students.splice(currentRow, 1);
        }
        refreshForm();
        refreshTable();
    }

    function searchRecord() {
        var tableRef = document.getElementById("results");
        var searchTerm = document.getElementById("search_term");
        if (searchTerm.value == "") {
            refreshTable();
            return;
        }
        tableRef.innerHTML = "";

        tableRef.appendChild(getTableHeader());

        var search_term = searchTerm.value;

        var filteredRecords = students.filter(function(student) {
            return student.name == search_term || student.surname == search_term;
        });

        if (filteredRecords.length == 0) {
            alert("Result Not found");
            refreshTable();
            return;
        }

        addTableRows(tableRef, filteredRecords);
    }

    function refreshTable() {
        var tableRef = document.getElementById("results");
        tableRef.innerHTML = "";

        tableRef.appendChild(getTableHeader());
        addTableRows(tableRef, students);
    }

    function getTableHeader() {
        var tr = document.createElement('tr');

        tr.appendChild(createTd("Name"));
        tr.appendChild(createTd("Surname"));
        tr.appendChild(createTd("Gender"));
        tr.appendChild(createTd("Maths"));
        tr.appendChild(createTd("Science"));
        tr.appendChild(createTd("Sociology"));
        tr.appendChild(createTd("English"));
        tr.appendChild(createTd("Hindi"));

        return tr;
    }

    function addTableRows(table, data) {
        for (var i = 0; i < data.length; i++) {
            var tr = document.createElement('tr');

            tr.appendChild(createTd(data[i].name));
            tr.appendChild(createTd(data[i].surname));
            tr.appendChild(createTd(data[i].gender));
            tr.appendChild(createTd(data[i].maths));
            tr.appendChild(createTd(data[i].science));
            tr.appendChild(createTd(data[i].sociology));
            tr.appendChild(createTd(data[i].english));
            tr.appendChild(createTd(data[i].hindi));

            if (i == currentRow) {
                tr.classList.add('active');
            }

            table.appendChild(tr);
        }
    }

    function createTd(data) {
        var tdEle = document.createElement('td');
        var textEle = document.createTextNode(data);
        tdEle.appendChild(textEle);
        return tdEle;
    }