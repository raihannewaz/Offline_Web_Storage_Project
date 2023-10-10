/// <reference path="jquery-3.1.1.min.js" />


$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $("#saveBtn").on('click', ns.save);
        ns.display();
    }

    function retrieveFromStorage() {
        var contactsJSON = sessionStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }

    ns.display = function () {
        $("#currentAction").html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();
        var results = retrieveFromStorage();
        bindToGrid(results);
    }

    function bindToGrid(results) {
        var html = "";
        for (var i = 0; i < results.length; i++) {
            var contact = results[i];
            html += '<tr><td>' + contact.name + '</td>';
            html += '<td>' + contact.email + '</td>';
            html += '<td>' + contact.phone + '</td>';
            html += '<td>' + contact.bdate + '</td>';
            html += '<td>' + contact.gender + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
        }
        html = html || '<tr><td colspan="3">No Records Available!!!</td></tr>'
        $("#contacts tbody").html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }

    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var results = retrieveFromStorage();
        $("#currentAction").html('Edit Contact');
        currentRecord = { key: key, contact: results[key] }
        displayCurrentRecord();
    }

    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $("#name").val(contact.name);
        $("#email").val(contact.email);
        $("#phone").val(contact.phone);
        $("#bdate").val(contact.bdate);
        $("#gender").val(contact.gender);
    }

    ns.save = function () {
        var contact = currentRecord.contact;
        contact.name = $("#name").val();
        contact.email = $("#email").val();
        contact.phone = $("#phone").val();
        contact.bdate = $("#bdate").val();
        contact.gender = $("#gender").val();

        var results = retrieveFromStorage();
        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }
        sessionStorage.setItem('contacts', JSON.stringify(results));
        ns.display();
    }

})();


