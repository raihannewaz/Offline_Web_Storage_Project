

// Database Create/Open
var db = openDatabase('contacts', '1.0', 'MyContactsApp', 2 * 1024 * 1024)


// Initialize Database
db.transaction(function (trans) {
    trans.executeSql('CREATE TABLE IF NOT EXISTS contacts(id integer primary key autoincrement,name, phone, bdate)');
});

// Add Contact Info
function addContact() {
    var inputName = document.getElementById("name").value;
    var inputPhone = document.getElementById("phone").value;
    var inputBdate = document.getElementById("bdate").value;
    if (inputName !== "" && inputPhone !== "" && inputBdate !== "") {
        db.transaction(function (trans) {
            trans.executeSql('INSERT INTO contacts(name, phone, bdate) VALUES(?,?,?)', [inputName, inputPhone, inputBdate], function (trans, results) {
                // Create Row and Cells
                var contactRow = document.createElement("tr");
                var id = document.createElement("td");
                var name = document.createElement("td");
                var phone = document.createElement("td");
                var bdate = document.createElement("td");
                var updateButton = document.createElement("td");
                var removeButton = document.createElement("td");

                // Set the value
                id.textContent = results.insertId;
                name.textContent = inputName;
                phone.textContent = inputPhone;
                bdate.textContent = inputBdate;
                updateButton.innerHTML = '<button onclick="updateContact(' + results.insertId + ')"' + '>Update</button>';
                removeButton.innerHTML = '<button onclick="removeContact(' + results.insertId + ')"' + '>Delete</button>';

                // Add td to Row
                contactRow.setAttribute("id", "c" + results.insertId);
                contactRow.appendChild(id);
                contactRow.appendChild(name);
                contactRow.appendChild(phone);
                contactRow.appendChild(bdate);
                contactRow.appendChild(updateButton);
                contactRow.appendChild(removeButton);

                // Add Row to Table
                document.getElementById("output").appendChild(contactRow);
            })
        })
    }
    else {
        alert("Please provide all values......")
    }
}



// Update Contact Info
function updateContact(id) {
    db.transaction(function (trans) {
        trans.executeSql('SELECT * FROM contacts WHERE id=?', [id], function (trans, results) {
            var contact = results.rows.item(0);
            document.getElementById('id').value = contact.id;
            document.getElementById('name').value = contact.name;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('bdate').value = contact.bdate;
        });
    });
}



// Save Update Contact Info
function save() {
    var inputname = document.getElementById("name").value;
    var inputphone = document.getElementById("phone").value;
    var inputbdate = document.getElementById("bdate").value;
    if (inputname !== "" && inputphone !== "" && inputbdate !== "") {
        db.transaction(function (trans) {
            var id = document.getElementById('id').value;
            var fName = document.getElementById('name').value;
            var lName = document.getElementById('phone').value;
            var pNum = document.getElementById('bdate').value;

            trans.executeSql('UPDATE contacts SET name=?, phone=?, bdate=? WHERE id=?', [fName, lName, pNum, id]);
        })
        alert("Record Updated Successfully.....")
    }
    else {
        alert("Please provide all values......")
    }
}



// Delete Contact Info
function removeContact(id) {
    if (confirm('Are You Sure You Want To Delete???')) {
        db.transaction(function (trans) {
            trans.executeSql('DELETE FROM contacts WHERE id=?', [id], function () {
                var contactTable = document.getElementById("output");
                var contactToDelete = document.getElementById("c" + id);
                contactTable.removeChild(contactToDelete);
            });
        });
    }
};



// Contact List
function listContact() {
    db.transaction(function (trans) {
        trans.executeSql('SELECT * FROM contacts', [], function (trans, results) {
            var len = results.rows.length;
            var i;
            for (i = 0; i < len; i++) {
                // Create Row & Cells
                var contactRow = document.createElement("tr");
                var id = document.createElement("td");
                var name = document.createElement("td");
                var phone = document.createElement("td");
                var bdate = document.createElement("td");
                var updateButton = document.createElement("td");
                var removeButton = document.createElement("td");

                // Set values
                id.textContent = results.rows.item(i).id;
                name.textContent = results.rows.item(i).name;
                phone.textContent = results.rows.item(i).phone;
                bdate.textContent = results.rows.item(i).bdate;
                updateButton.innerHTML = '<button onClick="updateContact(' + results.rows.item(i).id + ')"' + '>Update</button>';
                removeButton.innerHTML = '<button onClick="removeContact(' + results.rows.item(i).id + ')"' + '>Delete</button>';

                // Add Cell To Row
                contactRow.setAttribute("id", "c" + results.rows.item(i).id);
                contactRow.appendChild(id);
                contactRow.appendChild(name);
                contactRow.appendChild(phone);
                contactRow.appendChild(bdate);
                contactRow.appendChild(updateButton);
                contactRow.appendChild(removeButton);

                // Add Row to Table
                document.getElementById("output").appendChild(contactRow);
            }
        })
    })
};

//  Load at Start-Up
window.addEventListener("load", listContact, true);
