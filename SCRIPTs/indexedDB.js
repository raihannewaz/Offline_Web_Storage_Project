/// <reference path="jquery-3.1.1.min.js" />


window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;

$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;
    var db;

    ns.initialize = function () {
        $("#saveBtn").on('click', ns.save);
        var request = indexedDB.open("Raihan_Newaz", 1);

        request.onupgradeneeded = function (response) {
            var options = { keypath: "id", autoIncrement: true };
            response.currentTarget.result.createObjectStore("contacts", options);
        }
        request.onsuccess = function (response) {
            db = request.result;
            ns.display();
        }        
    }

    ns.display = function () {
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();

        var trans = db.transaction('contacts', 'readonly');
        var request = trans.objectStore("contacts").openCursor();
        var results = [];

        request.onsuccess = function (response) {
            var cursor = response.target.result;
            if (!cursor) {
                bindToGrid(results);
                return;
            }
            results.push({ key: cursor.key, contact: cursor.value });
            cursor.continue();
        }        
    }

    function bindToGrid(results) {
        var html = "";
        for (var i = 0; i < results.length; i++) {
            var key = results[i].key;
            var contact = results[i].contact;

            html += '<tr id="contact_'+key+'"><td>' + contact.name + '</td>';
            html += '<td>' + contact.email + '</td>';
            html += '<td>' + contact.phone + '</td>';
            html += '<td>' + contact.bdate + '</td>';
            html += '<td>' + contact.gender + '</td>';
            html += '<td>' + contact.img + '</td>';
            html += '<td><a class="edit" href="javascript:void(0)" data-key=' + key + '>Edit</a></td>';
            html += '<td><a class="delete" href="javascript:void(0)" data-key=' + key + '>Delete</a></td></tr>';
        }
        html = html || '<tr><td colspan="7">No Records Available!!!</td></tr>'
        $("#contacts tbody").html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
        $('#contacts a.delete').on('click', ns.removeContact);
    }

    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var trans = db.transaction('contacts', 'readonly');
        var store = trans.objectStore("contacts");
        var request = store.get(key);

        request.onsuccess = function (response) {
            $("#currentAction").html('Edit Contact');
            currentRecord = { key: key, contact: response.target.result }
            displayCurrentRecord();
        }        
    }

    ns.removeContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var trans = db.transaction('contacts', 'readwrite');
        var store = trans.objectStore("contacts");
        var request = store.delete(key);

        request.onsuccess = function (response) {
           alert("Contact removed");
           $('#contact_'+key).remove();
            displayCurrentRecord();
        }    
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
        contact.phone = $("#phone").val();
        contact.email = $("#email").val();
        contact.bdate = $("#bdate").val();
       
        contact.gender = $("#gender:checked").val();


        var trans = db.transaction('contacts', 'readwrite');
        var contacts = trans.objectStore("contacts");
        var request = currentRecord.key != null
            ? contacts.put(contact, currentRecord.key)
            : contacts.add(contact);

        request.onsuccess = function (response) {
            ns.display();
        }
    }
})();
