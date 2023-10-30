function saveRelativeDetails_old() {
    //alert("In function saveRelativeDetails");
    var personalInformation = new PersonalInformation();
    for (var index = 0; index < $("#tbdRelativeList").children().length; index++) {
        var obj = new Relative();
        obj.ID = $($($("#tbdRelativeList").children()[index]).children()[0]).html();
        obj.relativeName = $($($("#tbdRelativeList").children()[index]).children()[1]).html();
        obj.relation.RELATION_ID = $($($("#tbdRelativeList").children()[index]).children()[2]).html();
        obj.relation.RELATION_NM = $($($("#tbdRelativeList").children()[index]).children()[3]).html();
        obj.relativeEmail = $($($("#tbdRelativeList").children()[index]).children()[4]).html();
        obj.panNumber = $($($("#tbdRelativeList").children()[index]).children()[5]).html();
        obj.identificationType = $($($("#tbdRelativeList").children()[index]).children()[6]).html();
        obj.identificationNumber = $($($("#tbdRelativeList").children()[index]).children()[7]).html();
        obj.address = $($($("#tbdRelativeList").children()[index]).children()[8]).html();
        obj.mobile = $($($("#tbdRelativeList").children()[index]).children()[9]).html();
        obj.status = $($($("#tbdRelativeList").children()[index]).children()[10]).html();
        obj.remarks = $($($("#tbdRelativeList").children()[index]).children()[11]).html();
        obj.IsdesignatedPerson = $($($("#tbdRelativeList").children()[index]).children()[13]).html();

        personalInformation.lstRelative.push(obj);
    }
    //alert("personalInformation.lstRelative.length=" + personalInformation.lstRelative.length);
    $("#Loader").show();
    var token = $("#TokenKey").val();
    var webUrl = uri + "/api/Transaction/SaveRelativeDetails";
    $.ajax({
        url: webUrl,
        type: "POST",
        headers: {
            'TokenKeyH': token,
        },
        data: JSON.stringify(personalInformation),
        async: false,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (msg) {
            $("#Loader").hide();
            if (msg.StatusFl == true) {
                $("input[id*=txtD_ID]").val(msg.User.D_ID);
                alert("Relative(s) information updated successfully !");
                $("#liPI").removeClass('active');
                $("#liRD").removeClass('active');
                $("#liDA").addClass('active');
                $("#liIH").removeClass('active');
                $("#liOI").removeClass('active');
                $("#liCon").removeClass('active');

                $("#tab1").removeClass('active');
                $("#tab2").removeClass('active');
                $("#tab3").addClass('active');
                $("#tab4").removeClass('active');
                $("#tab5").removeClass('active');
                $("#tab6").removeClass('active');

                $("#tab3").click();
                $("#spnTitle").html("Step 3 of 6");

                $("#aSavenContinue").show();
                $("#aSubmitYourDeclaration").hide();
            }
            else {
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    //alert(msg.Msg);
                    //return false;
                }
            }
        },
        error: function (response) {
            $("#Loader").hide();
            alert(response.status + ' ' + response.statusText);
        }
    })
}
function SetEditRelation(cntrl) {
    var cntrlStatus = $($(cntrl).closest('tr').children()[4]).find("select[id*=ddlStatusRelation]");
    var cntrlIdentype = $($(cntrl).closest('tr').children()[7]).find("select[id*=ddlIdentificationTypeRelation]");

    var cntrlName = $($(cntrl).closest('tr').children()[5]).find("input[id*=txtName]");
    var cntrlEmail = $($(cntrl).closest('tr').children()[6]).find("input[id*=txtEmail]");
    var cntrlIdenNo = $($(cntrl).closest('tr').children()[8]).find("input[id*=txtIdentificationNumberRelation]");
    var cntrlAddress = $($(cntrl).closest('tr').children()[9]).find("input[id*=txtAddressRelation]");
    var cntrlPhone = $($(cntrl).closest('tr').children()[10]).find("input[id*=txtPhoneRelation]");
    var cntrlIsDesignated = $($(cntrl).closest('tr').children()[11]).find("input[id*=txtdpPan]");

    var CurrentStatus = $(cntrlStatus).val();
    var CurrentIdentype = $(cntrlIdentype).val();

    var Identypeoptions = '<option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option>';
    var Statusoptions = '<option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select>';

    $(cntrlIsDesignated).removeAttr("disabled", "disabled");
    $(cntrlName).removeAttr("disabled", "disabled");
    $(cntrlEmail).removeAttr("disabled", "disabled");
    $(cntrlIdentype).removeAttr("disabled", "disabled");
    $(cntrlIdenNo).removeAttr("disabled", "disabled");
    $(cntrlAddress).removeAttr("disabled", "disabled");
    $(cntrlPhone).removeAttr("disabled", "disabled");
    $(cntrlStatus).removeAttr("disabled", "disabled");

    $(cntrlStatus).empty();
    $(cntrlStatus).append(Statusoptions);
    $(cntrlStatus).val(CurrentStatus);

    $(cntrlIdentype).empty();
    $(cntrlIdentype).append(Identypeoptions);
    $(cntrlIdentype).val(CurrentIdentype);

}
function saveRelativeDetails() {
    if (fnValidateRelativeDetail()) {
        var personalInformation = new PersonalInformation();
        for (var index = 0; index < $("#tbdRelativeList").children().length; index++) {
            var obj = new Relative();
            var cntrlStatus = $($($("#tbdRelativeList").children()[index]).children()[4]).find("select[id*=ddlStatusRelation]");
            var cntrlName = $($($("#tbdRelativeList").children()[index]).children()[5]).find("input[id*=txtName]");
            var cntrlEmail = $($($("#tbdRelativeList").children()[index]).children()[6]).find("input[id*=txtEmail]");
            var cntrlIdentype = $($($("#tbdRelativeList").children()[index]).children()[7]).find("select[id*=ddlIdentificationTypeRelation]");
            var cntrlIdenNo = $($($("#tbdRelativeList").children()[index]).children()[8]).find("input[id*=txtIdentificationNumberRelation]");
            var cntrlAddress = $($($("#tbdRelativeList").children()[index]).children()[9]).find("input[id*=txtAddressRelation]");
            var cntrlPhone = $($($("#tbdRelativeList").children()[index]).children()[10]).find("input[id*=txtPhoneRelation]");
            var cntrlIsDesignated = $($($("#tbdRelativeList").children()[index]).children()[11]).find("input[id*=txtdpPan]");
            var IsDesignated = "No";

            if ($(cntrlIsDesignated).prop('checked')) {
                IsDesignated = "Yes";
            }
            if (cntrlStatus.val() != "" && cntrlStatus.val() != null) {
                //alert(cntrlStatus.val());
                //alert($($($("#tbdRelativeList").children()[index]).children()[3]).html());
                obj.ID = $($($("#tbdRelativeList").children()[index]).children()[0]).html();
                obj.relativeName = $(cntrlName).val();
                obj.relation.RELATION_ID = $($($("#tbdRelativeList").children()[index]).children()[1]).html();
                obj.relation.RELATION_NM = $($($("#tbdRelativeList").children()[index]).children()[3]).html();
                obj.relativeEmail = $(cntrlEmail).val();

                if ($(cntrlIdentype).val() == "PAN") {
                    obj.panNumber = $(cntrlIdenNo).val();
                    obj.identificationNumber = $(cntrlIdenNo).val();
                }
                else {
                    obj.identificationNumber = $(cntrlIdenNo).val();
                    obj.panNumber = "";
                }
                //alert("Pan=" + $(cntrlIdenNo).val());
                obj.identificationType = $(cntrlIdentype).val();
                obj.address = $(cntrlAddress).val();
                obj.mobile = $(cntrlPhone).val();
                obj.status = $(cntrlStatus).val();
                obj.remarks = "";
                obj.IsdesignatedPerson = IsDesignated;

                if (obj.status != null) {
                    personalInformation.lstRelative.push(obj);
                }
            }
        }


        //alert("personalInformation.lstRelative.length=" + personalInformation.lstRelative.length);
        $("#Loader").show();
        var token = $("#TokenKey").val();
        var webUrl = uri + "/api/Transaction/SaveRelativeDetails";
        $.ajax({
            url: webUrl,
            type: "POST",
            headers: {
                'TokenKeyH': token,
            },
            data: JSON.stringify(personalInformation),
            async: false,
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            success: function (msg) {
                $("#Loader").hide();
                if (msg.StatusFl == true) {
                    $("input[id*=txtD_ID]").val(msg.User.D_ID);
                    //alert("Relative(s) information updated successfully !");

                    //alert("In success for Save relative function");
                    var result = "<option value=''></option>";
                    var result1 = "<option value=''></option>";

                    result += "<option value='-1'>Not Applicable</option>";
                    result1 += "<option value='-1'>Not Applicable</option>";

                    result += "<option value='0'>Self</option>";
                    result1 += "<option value='0'>Self</option>";
                    for (var i = 0; i < msg.User.lstRelative.length; i++) {
                        if (msg.User.lstRelative[i].status !== "NotApplicable") {
                            var obj = new Object();
                            obj.ID = msg.User.lstRelative[i].ID;
                            obj.relativeName = msg.User.lstRelative[i].relativeName;
                            relativeDetails.push(obj);
                            result += "<option value='" + msg.User.lstRelative[i].ID + "'>" + msg.User.lstRelative[i].relativeName + "</option>";
                            result1 += "<option value='" + msg.User.lstRelative[i].ID + "'>" + msg.User.lstRelative[i].relativeName + "</option>";
                        }
                    }
                    $("#ddlDematAccountDetailsFor").html(result);
                    $("#ddlFor").html(result);
                    $("#ddlForPhysical").html(result1);


                    fnGetDPDematDetails();

                    $("#liPI").removeClass('active');
                    $("#liRD").removeClass('active');
                    $("#liDA").addClass('active');
                    $("#liIH").removeClass('active');
                    $("#liCon").removeClass('active');

                    $("#tab3").show();
                    $("#tab1").hide();
                    $("#tab2").hide();
                    $("#tab5").hide();
                    $("#tab4").hide();

                    $("#tab1").removeClass('active');
                    $("#tab2").removeClass('active');
                    $("#tab3").addClass('active');
                    $("#tab4").removeClass('active');
                    $("#tab5").removeClass('active');

                    $("#tab3").click();
                    $("#spnTitle").html("Step 3 of 5");
                    //debugger;
                    //setRelativeInformation(msg);

                    $("#aSavenContinue").show();
                    $("#aSubmitYourDeclaration").hide();
                    $("#spnblinkpreview").hide();
                }
                else {
                    if (msg.Msg == "SessionExpired") {
                        alert("Your session is expired. Please login again to continue");
                        window.location.href = "../LogOut.aspx";
                    }
                    else {
                        //alert(msg.Msg);
                        //return false;
                    }
                }
            },
            error: function (response) {
                $("#Loader").hide();
                alert(response.status + ' ' + response.statusText);
            }
        })
    }
    else {
        //alert("Please provide all mandatory fields highlighted in red.");
    }
}
function Relative() {
    this.ID = 0;
    this.relativeName = $("#txtName").val() == null ? "" : ($("#txtName").val().trim() == "" ? "" : $("#txtName").val());
    this.relation = new Relation();
    this.relativeEmail = $("#txtEmail").val() == null ? "" : ($("#txtEmail").val().trim() == "" ? "" : $("#txtEmail").val());
    this.panNumber = $("#txtPAN").val() == null ? "" : ($("#txtPAN").val().trim() == "" ? "" : $("#txtPAN").val());
    this.identificationType = $("#ddlIdentificationTypeRelation").val() == null ? "" : ($("#ddlIdentificationTypeRelation").val().trim() == "" ? "" : $("#ddlIdentificationTypeRelation").val());
    this.identificationNumber = $("#txtIdentificationNumberRelation").val() == null ? "" : ($("#txtIdentificationNumberRelation").val().trim() == "" ? "" : $("#txtIdentificationNumberRelation").val());
    this.address = $("#txtAddressRelation").val() == null ? "" : ($("#txtAddressRelation").val().trim() == "" ? "" : $("#txtAddressRelation").val());
    this.mobile = $("#txtPhoneRelation").val() == null ? "" : ($("#txtPhoneRelation").val().trim() == "" ? "" : $("#txtPhoneRelation").val());
    this.status = $("#ddlStatusRelation").val() == null ? "" : ($("#ddlStatusRelation").val().trim() == "" ? "" : $("#ddlStatusRelation").val());
    this.remarks = $("#remarks").val() == null ? "" : ($("#remarks").val().trim() == "" ? "" : $("#remarks").val());
    this.lstDematAccount = new Array();
    this.IsdesignatedPerson = $("#txtdpPan").prop('checked') ? "Yes" : "No";

}
function Relation() {
    this.RELATION_ID = $("select[id*=ddlRelation]").val() == null ? 0 : ($("select[id*=ddlRelation]").val().trim() == "" ? 0 : $("select[id*=ddlRelation]").val());
    this.RELATION_NM = $("select[id*=ddlRelation] option:selected").text();
}
function fnAddRelativeDetail() {
    if (fnValidateRelativeDetail()) {
        var obj = new Relative();
        var RelativeId = 0;

        if (isEdit) {
            RelativeId = $(editableElement[0]).html();
        }

        if (fnVerifyPan(obj.panNumber, RelativeId, obj.relation.RELATION_ID, obj.IsdesignatedPerson) == true) {
            if (RelativeId == 0) {
                for (var index = 0; index < $("#tbdRelativeList").children().length; index++) {
                    if (
                        !(
                            RelativeId == $($($("#tbdRelativeList").children()[index]).children()[0]).html()
                            && obj.relativeName == $($($("#tbdRelativeList").children()[index]).children()[1]).html()
                            && obj.relation.RELATION_ID == $($($("#tbdRelativeList").children()[index]).children()[2]).html()
                        )
                        && obj.panNumber == $($($("#tbdRelativeList").children()[index]).children()[6]).html()
                        && obj.panNumber.toUpperCase() != "NOT APPLICABLE"
                        //&& obj.status == "ACTIVE"
                    ) {
                        alert("Pan already exist !");
                        return;
                    }
                }
            }
            if (!isEdit) {
                var str = "";
                str += '<tr>';
                str += '<td style="display:none;">' + obj.ID + '</td>';
                str += '<td>' + obj.relativeName + '</td>';
                str += '<td style="display:none;">' + obj.relation.RELATION_ID + '</td>';
                str += '<td>' + obj.relation.RELATION_NM + '</td>';
                str += '<td>' + obj.relativeEmail + '</td>';
                str += '<td>' + obj.panNumber + '</td>';
                str += '<td>' + obj.identificationType + '</td>';
                str += '<td>' + obj.identificationNumber + '</td>';
                str += '<td style="display:none;">' + obj.address + '</td>';
                str += '<td>' + obj.mobile + '</td>';
                str += '<td>' + obj.status + '</td>';
                str += '<td style="display:none;">' + obj.remarks + '</td>';
                str += '<td><a data-target="#modalAddRelativeDetail" data-toggle="modal" onclick=\"javascript:fnEditRelativeDetail();\">';
                str += '<img src="../assets/images/edit.png" style="width:24px;height:24px;" /></a>&nbsp;';
                str += '<a data-target="#modalDeleteRelativeDetail" data-toggle="modal" onclick=\"javascript:fnDeleteRelativeDetail();\">';
                str += '<img src="../assets/images/delete.png" style = "width:24px;height:24px;" /></a></td>';
                str += '<td style="display:none;">' + obj.IsdesignatedPerson + '</td>';
                str += '</tr>';
                $("#tbdRelativeList").append(str);
            }
            else {
                $(editableElement[1]).html(obj.relativeName);
                $(editableElement[2]).html(obj.relation.RELATION_ID);
                $(editableElement[3]).html(obj.relation.RELATION_NM);
                $(editableElement[4]).html(obj.relativeEmail);
                $(editableElement[5]).html(obj.panNumber);
                $(editableElement[6]).html(obj.identificationType);
                $(editableElement[7]).html(obj.identificationNumber);
                $(editableElement[8]).html(obj.address);
                $(editableElement[9]).html(obj.mobile);
                $(editableElement[10]).html(obj.status);
                $(editableElement[11]).html(obj.remarks);
                $(editableElement[13]).html(obj.IsdesignatedPerson);

            }
            fnClearFormRelativeDetail();
            $("#modalAddRelativeDetail").modal('hide');
        }
    }
    else {
        alert("Please provide all mandatory fields highlighted in red.");
    }
}
function fnValidateRelativeDetail() {
    var count = 0;
    var flagMFRRelation = false;
    var flagRelationSpouse = false;
    var txtRelativeEmail = $("input[id*='txtRelativeEmail']").val();
    var txtRelativeAddress = $("input[id*='txtRelativeAddress']").val();
    var txtMFRMandatory = $("input[id*=txtMFRMandatory]").val();
    var txtSpousePANMandatory = $("input[id*=txtSpousePANMandatory]").val();
    //alert(txtSpousePANMandatory);
    for (var index = 0; index < $("#tbdRelativeList").children().length; index++) {
        var cntrlRelation = $($($("#tbdRelativeList").children()[index]).children()[3]).html();
        var cntrlStatus = $($($($("#tbdRelativeList").children()[index]).children()[4]).children()[0]).val();
        var cntrlName = $($($($("#tbdRelativeList").children()[index]).children()[5]).children()[0]).val();
        var cntrlEmail = $($($($("#tbdRelativeList").children()[index]).children()[6]).children()[0]).val();
        var cntrlIdentype = $($($($("#tbdRelativeList").children()[index]).children()[7]).children()[0]).val();
        var cntrlIdenNo = $($($($("#tbdRelativeList").children()[index]).children()[8]).children()[0]).val();
        var cntrlAddress = $($($($("#tbdRelativeList").children()[index]).children()[9]).children()[0]).val();
        var cntrlPhone = $($($($("#tbdRelativeList").children()[index]).children()[10]).children()[0]).val();

        var isMandatory = $($($("#tbdRelativeList").children()[index]).children()[2]).html();
        if (isMandatory == "Yes") {
            if (cntrlStatus == "Select" || cntrlStatus == "Select" || cntrlStatus == null || cntrlStatus == "") {
                if (cntrlRelation == "Spouse" || cntrlRelation == "Husband" || cntrlRelation == "HUSBAND" || cntrlRelation == "Wife" || cntrlRelation == "WIFE") {
                    if ($("#YesMarried").prop("checked")) {
                        isMarried = "Yes";
                    }
                    else if ($("#NoMarried").prop("checked")) {
                        isMarried = "No";
                    }
                    if (isMarried == "Yes") {
                        alert('Please provide ' + cntrlRelation + ' information');
                    }
                }
                else {
                    alert('' + cntrlRelation + ' is Mandatory to fill. In case you do not have details, Please select status as "Not Applicable"');
                }
                return false;
            }
            else if (cntrlStatus == "NotApplicable") {
                if ($("#YesMarried").prop("checked")) {
                    isMarried = "Yes";
                }
                else if ($("#NoMarried").prop("checked")) {
                    isMarried = "No";
                }
                if (cntrlRelation == "Spouse" || cntrlRelation == "Husband" || cntrlRelation == "HUSBAND" || cntrlRelation == "Wife" || cntrlRelation == "WIFE") {
                    if (isMarried == "Yes") {
                        alert('Please provide Spouse information');
                        return false;
                    }
                }
            }
        }

        if (cntrlStatus == "ACTIVE") {
            if (cntrlName == "" || cntrlName == null) {
                $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(6)').addClass('has-error');
                count++;
            }
            else {
                $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(6)').removeClass('has-error');
                if (cntrlName.length > 0 && !/^[a-zA-Z][\sa-zA-Z]*/.test(cntrlName)) {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(6)').addClass('has-error');
                    count++;
                    alert("Invalid name, please enter only characters or first character cannot include space.");
                    return false;
                }
            }

            if (cntrlIdentype == "" || cntrlIdentype == null) {
                $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(8)').addClass('has-error');
                count++;
            }
            else {
                $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(8)').removeClass('has-error');
                if (cntrlIdenNo == "" || cntrlIdenNo == null) {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').addClass('has-error');
                    count++;
                }
                else {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').removeClass('has-error');

                    if (cntrlIdentype == "PAN" && cntrlIdenNo.length > 0 && cntrlStatus != "NotApplicable") {
                        if (!ValidatePAN(cntrlIdenNo)) {
                            $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').addClass('has-error');
                            count++;
                            alert("Invalid PAN of " + cntrlRelation + "");
                            return false
                        }
                    }
                }
            }

            if (cntrlRelation == "Spouse" || cntrlRelation == "Husband" || cntrlRelation == "HUSBAND" || cntrlRelation == "Wife" || cntrlRelation == "WIFE") {
                if (txtSpousePANMandatory == "true") {
                    if (cntrlIdentype != "PAN") {
                        $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').addClass('has-error');
                        count++;
                        alert("Please select PAN as Identification type");
                        return false
                    }
                    else if (cntrlIdentype == "PAN" && cntrlIdenNo.length > 0 && cntrlStatus != "NotApplicable") {
                        if (!ValidatePAN(cntrlIdenNo)) {
                            $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').addClass('has-error');
                            count++;
                            alert("Invalid PAN of " + cntrlRelation + "");
                            return false
                        }
                    }
                }
            }
            

            if (txtRelativeEmail.toUpperCase() == "TRUE") {
                if (cntrlEmail == null || cntrlEmail == undefined || cntrlEmail == "") {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(7)').addClass('has-error');
                    count++;
                }
                else {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(7)').removeClass('has-error');
                }
            }
            if (cntrlEmail.length > 0 && cntrlStatus != "NotApplicable") {
                if (!validateEmail(cntrlEmail)) {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(7)').addClass('has-error');
                    count++;
                    alert("Please Enter Valid Email of " + cntrlRelation + "");
                    return false;
                }
                else {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(7)').removeClass('has-error');
                }
            }
            if (txtRelativeAddress.toUpperCase() == "TRUE") {
                if (cntrlAddress == null || cntrlAddress == undefined || cntrlAddress == "") {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').addClass('has-error');
                    count++;
                }
                else {
                    $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(9)').removeClass('has-error');
                }
            }
            if (cntrlPhone == '' || cntrlPhone == null) {
                alert("Please enter contact number of " + cntrlRelation + "");
                count++;
            }
            else if (cntrlPhone.length > 0 && cntrlPhone.length < 10 && cntrlStatus != "NotApplicable") {
                count++;
                alert("Please enter valid mobile number of " + cntrlRelation + "");
                $('#tbdRelativeList tr:nth-child(' + (index + 1) + ') td:nth-child(10)').addClass('has-error');
            }
        }
    }
    //debugger;
    if (count > 0) {
        alert("Please fill in the required details");
        return false;
    }
    return true
}
function validateEmail(values) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(values) == false) {
        return false;
    }
    return true;
}
function ValidatePAN(valPan) {
    //alert("In function ValidatePAN");
    //alert("valPan=" + valPan);
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    var fl = true;
    if (valPan == "" || valPan == null || valPan == undefined) {
        fl = false;
    }
    else if (!regpan.test(valPan)) {
        fl = false;
    }
    return fl;
}
function fnCloseModalAddRelativeDetail() {
    fnClearFormRelativeDetail();
}
function fnSameAddress() {
    //alert("In fnSameAddress");
    //alert($("#txtSameAddressRelation").prop("checked"));
    if ($("#txtSameAddressRelation").prop("checked")) {
        var pAddr = $("input[id*=txtAddress]").val();
        //alert("Personal Address=" + pAddr);
        $("#txtAddressRelation").val(pAddr);
        $("#txtAddressRelation").prop("disabled", true);
    }
    else {
        $("#txtAddressRelation").val('');
        $("#txtAddressRelation").prop("disabled", false);
    }
}
function fnClearFormRelativeDetail() {
    $("#txtName").val('');
    $("select[id*=ddlRelation]").val('');
    $("#txtPAN").val('');
    $("#txtEmail").val('');
    $("#ddlIdentificationTypeRelation").val('');
    $("#txtIdentificationNumberRelation").val('');
    $("#txtAddressRelation").val('');
    $("#txtPhoneRelation").val('');
    $("#ddlStatusRelation").val('');
    $("#txtSameAddressRelation").prop('checked', false);
    $("#remarks").val('');
    isEdit = false;
    editableElement = null;
    $("#txtSameAddressRelation").prop("checked", false);
    $("#txtSkipPan").prop("checked", false);
    $("#txtSameAddressRelation").prop("disabled", false);
    $("#txtSkipPan").prop("disabled", false);
    $("#txtName").prop("disabled", false);
    $("#txtEmail").prop("disabled", false);
    $("#txtPAN").prop("disabled", false);
    $("#ddlIdentificationTypeRelation").prop("disabled", false);
    $("#txtIdentificationNumberRelation").prop("disabled", false);
    $("#txtAddressRelation").prop("disabled", false);
    $("#txtPhoneRelation").prop("disabled", false);
    $("#ddlStatusRelation").prop("disabled", false);

    $("#lblRelation").removeClass('requiredlbl');
    $("#lblName").removeClass('requiredlbl');
    $("#lblPAN").removeClass('requiredlbl');
    $("#lblEmail").removeClass('requiredlbl');
    $("#lblIdentificationTypeRelation").removeClass('requiredlbl');
    $("#lblIdentificationNumberRelation").removeClass('requiredlbl');
    $("#lblAddressRelation").removeClass('requiredlbl');
    $("#lblPhoneRelation").removeClass('requiredlbl');
    $("#lblStatusRelation").removeClass('requiredlbl');
    $("#lblRelativeRemarks").removeClass('requiredlbl');

    $("#spMaterialFinancialRelationship").hide();
    $("#spRelativeRemarks").show();
    $("#txtSkipPan").prop("checked", false);
    $("#txtdpPan").prop("checked", false);
    $("#txtdpPan").prop('disabled', false);
}
function fnEditRelativeDetail() {
    isEdit = true;
    var selectedTr = $(event.currentTarget).closest('tr').children();
    editableElement = selectedTr;
    var relativeName = $(selectedTr[1]).html();
    var relationId = $(selectedTr[2]).html();
    var relation = $(selectedTr[3]).html();
    var email = $(selectedTr[4]).html();
    var pan = $(selectedTr[6]).html();
    var identificationType = $(selectedTr[5]).html();
    var identificationNumber = $(selectedTr[7]).html();
    var address = $(selectedTr[8]).html();
    var mobile = $(selectedTr[9]).html();
    var status = $(selectedTr[10]).html();
    var remarks = $(selectedTr[11]).html();
    var IsDesignatedPerson = $(selectedTr[13]).html();

    if (IsDesignatedPerson == "Yes") {
        $("#txtdpPan").prop('checked', true)
    }
    else {
        $("#txtdpPan").prop('checked', false)
    }
    $("#txtName").val(relativeName);
    $("select[id*=ddlRelation]").val(relationId);
    $("#txtPAN").val(pan);
    $("#txtEmail").val(email);
    $("#ddlIdentificationTypeRelation").val(identificationType);
    $("#txtIdentificationNumberRelation").val(identificationNumber);
    $("#txtAddressRelation").val(address);
    $("#txtPhoneRelation").val(mobile);
    $("#ddlStatusRelation").val(status);
    $("#remarks").val(remarks);

    if ($("select[id*=ddlRelation]").val() == "0") {
        $("#txtSameAddressRelation").attr("disabled", "disabled");
        $("#txtSkipPan").attr("disabled", "disabled");
        $("#txtSameAddressRelation").prop("checked", false);
        $("#txtSkipPan").prop("checked", false);
        $("#txtName").attr("disabled", "disabled");
        $("#txtPAN").attr("disabled", "disabled");
        $("#txtEmail").attr("disabled", "disabled");
        $("#ddlIdentificationTypeRelation").attr("disabled", "disabled");
        $("#txtIdentificationNumberRelation").attr("disabled", "disabled");
        $("#txtAddressRelation").attr("disabled", "disabled");
        $("#txtPhoneRelation").attr("disabled", "disabled");
        $("#ddlStatusRelation").attr("disabled", "disabled");

        if ($("select[id*=ddlRelation] option:selected").text().toUpperCase() == "MATERIAL FINANCIAL RELATION" || $("select[id*=ddlRelation] option:selected").text().toUpperCase() == "MATERIAL FINANCIAL RELATIONSHIP") {
            $("#spRelativeRemarks").hide();
            $("#spMaterialFinancialRelationship").show();
        }
        else {
            $("#spMaterialFinancialRelationship").hide();
            $("#spRelativeRemarks").show();
        }
    }
    else {
        $("#txtSameAddressRelation").prop("disabled", false);
        $("#txtSkipPan").prop("disabled", false);
        $("#txtSameAddressRelation").prop("checked", false);
        $("#txtSkipPan").prop("checked", false);
        $("#txtName").prop("disabled", false);
        $("#txtPAN").prop("disabled", false);
        $("#txtEmail").prop("disabled", false);
        $("#ddlIdentificationTypeRelation").prop("disabled", true);
        $("#txtIdentificationNumberRelation").prop("disabled", true);
        $("#txtAddressRelation").prop("disabled", false);
        $("#txtPhoneRelation").prop("disabled", false);
        $("#ddlStatusRelation").prop("disabled", false);

        if ($("select[id*=ddlRelation] option:selected").text().toUpperCase() == "MATERIAL FINANCIAL RELATION" || $("select[id*=ddlRelation] option:selected").text().toUpperCase() == "MATERIAL FINANCIAL RELATIONSHIP") {
            $("#spRelativeRemarks").hide();
            $("#spMaterialFinancialRelationship").show();
        }
        else {
            $("#spMaterialFinancialRelationship").hide();
            $("#spRelativeRemarks").show();
        }

        if ($("#txtPAN").val() == undefined || $("#txtPAN").val() == null || $("#txtPAN").val().trim() == "") {
            $("#txtPAN").prop("disabled", true);
            $("#txtSkipPan").prop("checked", true);
        }
        else {
            $("#txtPAN").prop("disabled", false);
            $("#txtSkipPan").prop("checked", false);
        }

    }
}
function fnGetRelativeDetailByLoginId() {

}
function fnGetRelativeDetail() {
    $("#Loader").show();
    var webUrl = uri + "/api/PreClearanceRequest/GetRelativeDetailList";
    $.ajax({
        url: webUrl,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        data: {},
        success: function (msg) {
            $("#Loader").hide();
            if (isJson(msg)) {
                msg = JSON.parse(msg);
            }
            if (msg.StatusFl == true) {
                var result = "";
                var result1 = "";
                result += "<option value=''></option>";
                result += "<option value='-1'>Not Applicable</option>";
                //result += "<option value='0'>Self</option>";
                result1 += "<option value=''></option>";
                //result1 += "<option value='0'>Self</option>";
                relativeDetails = new Array();
                for (var i = 0; i < msg.RelativeDetailList.length; i++) {
                    if (msg.RelativeDetailList[i].relativeName !== "Not Applicable") {
                        var obj = new Object();
                        obj.ID = msg.RelativeDetailList[i].ID;
                        obj.relativeName = msg.RelativeDetailList[i].relativeName;
                        relativeDetails.push(obj);
                        result += "<option value='" + msg.RelativeDetailList[i].ID + "'>" + msg.RelativeDetailList[i].relativeName + "</option>";
                        result1 += "<option value='" + msg.RelativeDetailList[i].ID + "'>" + msg.RelativeDetailList[i].relativeName + "</option>";
                    }
                }
                $("#ddlDematAccountDetailsFor").html(result);
                $("#ddlFor").html(result);
                $("#ddlForPhysical").html(result1);
            }
            else {
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    //  alert(msg.Msg);
                    return false;
                }
            }
        },
        error: function (response) {
            $("#Loader").hide();
            alert(response.status + ' ' + response.statusText);
        }
    })
}
function getRelativeInformationById(relativeId) {
    $("#Loader").show();
    var webUrl = uri + "/api/Relative/GetRelativeDetail";
    $.ajax({
        url: webUrl,
        type: "POST",
        async: false,
        data: JSON.stringify({
            ID: relativeId
        }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (msg) {
            $("#Loader").hide();
            if (isJson(msg)) {
                msg = JSON.parse(msg);
            }
            if (msg.StatusFl == true) {
                $("#txtPan").val(msg.Relative.panNumber);
                $("#txtPanPhysical").val(msg.Relative.panNumber);
            }
            else {
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    alert(msg.Msg);
                    return false;
                }
            }
        },
        error: function (response) {
            $("#Loader").hide();
            alert(response.status + ' ' + response.statusText);
        }
    })
}
function setRelativeInformation(msg) {
    //alert("In function setRelativeInformation");
    //alert(msg.User.lstRelative);

    if ($("#YesMarried").prop("checked")) {
        isMarried = "Yes";
    }
    else if ($("#NoMarried").prop("checked")) {
        isMarried = "No";
    }

    var str = "";
    if (msg.User.lstRelative != null) {
        arrRelative = new Array();
        for (var i = 0; i < msg.User.lstRelative.length; i++) {
            var obj = new Object();
            obj.ID = msg.User.lstRelative[i].ID;
            obj.RELATION_ID = msg.User.lstRelative[i].relation.RELATION_ID;
            obj.RELATION_NM = msg.User.lstRelative[i].relation.RELATION_NM;
            obj.status = msg.User.lstRelative[i].status;
            obj.relativeName = msg.User.lstRelative[i].relativeName;
            obj.relativeEmail = msg.User.lstRelative[i].relativeEmail;
            obj.identificationType = msg.User.lstRelative[i].identificationType;
            obj.panNumber = msg.User.lstRelative[i].panNumber;
            obj.identificationNumber = msg.User.lstRelative[i].identificationNumber;
            obj.address = msg.User.lstRelative[i].address;
            obj.mobile = msg.User.lstRelative[i].mobile;
            obj.IsdesignatedPerson = msg.User.lstRelative[i].IsdesignatedPerson;
            obj.isDeleteRelative = msg.User.lstRelative[i].isDeleteRelative;
            obj.isMandatory = msg.User.lstRelative[i].IsMandatory;
            arrRelative.push(obj);
        }

        var str = "";
        //alert("Here");
        if (arrRelations != null) {
            //alert("In arrRelations not null");
            //alert("arrRelations.length=" + arrRelations.length);
            //alert("arrRelations.length=" + arrRelations.length);
            for (var x = 0; x < arrRelations.length; x++) {
                var existsFlg = false;
                for (var y = 0; y < arrRelative.length; y++) {
                    if (arrRelations[x].RELATION_ID == arrRelative[y].RELATION_ID) {
                        if (arrRelations[x].RELATION_NM == "Spouse") {
                            if (isMarried == "No") {
                                existsFlg = true;
                                str += '<tr>';
                                str += '<td style="display:none;">' + arrRelative[y].ID + '</td>';
                                str += '<td style="display:none;">' + arrRelations[x].RELATION_ID + '</td>';
                                str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';
                                str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                                str += '<td><select disabled="disabled" name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable" selected>Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                                str += '<td><input disabled="disabled" id="txtName" type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                                str += '<td><input disabled="disabled" id="txtEmail"  type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                                str += '<td><select disabled="disabled" name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable" selected>Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                                str += '<td><input disabled="disabled" id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="Not Applicable" /></td>';
                                str += '<td><input disabled="disabled" id="txtAddressRelation" type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                                str += '<td><input disabled="disabled" id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" value="Not Applicable" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                                str += '<td><input disabled="disabled" id="txtdpPan" type="checkbox" /></td>';
                                str += "<td><div class='tools'>";

                                //str += '<a id="edit_"' + i + ' onclick="javascript:SetEditRelation(this);" style="margin-right:10px;">';
                                //str += "<i class='fa fa-edit'></i>";
                                //str += "</a>";

                                //str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                                //str += "<i class='fa fa-plus-circle'></i>";
                                //str += "</a>";
                                str += "</div></td>";
                                str += '<tr>';
                            }
                            else {
                                existsFlg = true;
                                str += '<tr>';

                                str += '<td style="display:none;">' + arrRelative[y].ID + '</td>';
                                str += '<td style="display:none;">' + arrRelative[y].RELATION_ID + '</td>';
                                str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';

                                str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                                str += '<td>';
                                str += '<select name="Status_Relation" disabled="disabled" id="ddlStatusRelation" class="form-control">';
                                str += '<option value="">Select</option>';
                                if (arrRelative[y].status == "NotApplicable") {
                                    str += '<option value="NotApplicable" selected>Not Applicable</option>';
                                }
                                else {
                                    str += '<option value="NotApplicable">Not Applicable</option>';
                                }
                                if (arrRelative[y].status == "ACTIVE") {
                                    str += '<option value="ACTIVE" selected>ACTIVE</option>';
                                }
                                else {
                                    str += '<option value="ACTIVE">ACTIVE</option>';
                                }
                                if (arrRelative[y].status == "INACTIVE") {
                                    str += '<option value="INACTIVE" selected>INACTIVE</option>';
                                }
                                else {
                                    str += '<option value="INACTIVE">INACTIVE</option>';
                                }

                                str += '</select>';
                                str += '</td>';
                                str += '<td><input id="txtName" disabled="disabled" type="text" class="form-control" autocomplete="off" value="' + arrRelative[y].relativeName + '" /></td>';
                                str += '<td><input id="txtEmail" type="text" disabled="disabled" class="form-control" autocomplete="off" value="' + arrRelative[y].relativeEmail + '" /></td>';
                                str += '<td>';
                                str += '<select name="identification_type_relation" disabled="disabled" id="ddlIdentificationTypeRelation" class="form-control validatepan">';
                                str += '<option value="">Select</option>';
                                if (arrRelative[y].identificationType == "NotApplicable") {
                                    str += '<option value="NotApplicable" selected>Not Applicable</option>';
                                }
                                else {
                                    str += '<option value="NotApplicable">Not Applicable</option>';
                                }

                                if (arrRelative[y].identificationType == "PAN") {
                                    str += '<option value="PAN" selected>PAN</option>';
                                }
                                else {
                                    str += '<option value="PAN">PAN</option>';
                                }
                                if (arrRelative[y].identificationType == "DRIVING_LICENSE") {
                                    str += '<option value="DRIVING_LICENSE" selected>DRIVING LICENSE</option>';
                                }
                                else {
                                    str += '<option value="DRIVING_LICENSE">DRIVING LICENSE</option>';
                                }
                                if (arrRelative[y].identificationType == "AADHAR_CARD") {
                                    str += '<option value="AADHAR_CARD" selected>AADHAR CARD</option>';
                                }
                                else {
                                    str += '<option value="AADHAR_CARD">AADHAR CARD</option>';
                                }
                                if (arrRelative[y].identificationType == "PASSPORT") {
                                    str += '<option value="PASSPORT" selected>PASSPORT</option>';
                                }
                                else {
                                    str += '<option value="PASSPORT">PASSPORT</option>';
                                }
                                str += '</select>';
                                str += '</td> ';

                                if (arrRelative[y].identificationType == "PAN") {
                                    str += '<td><input id="txtIdentificationNumberRelation" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="' + arrRelative[y].panNumber + '" /></td>';
                                }
                                else {
                                    str += '<td><input id="txtIdentificationNumberRelation" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="' + arrRelative[y].identificationNumber + '" /></td>';
                                }
                                str += '<td><input id="txtAddressRelation" type="text" disabled="disabled" class="form-control" autocomplete="off" value="' + arrRelative[y].address + '" /></td>';
                                str += '<td><input id="txtPhoneRelation" type="text" disabled="disabled" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" value="' + arrRelative[y].mobile + '" /></td>';
                                str += '<td><input id="txtdpPan" disabled="disabled" type="checkbox" /></td>';
                                str += "<td><div class='tools'>";

                                str += '<a id="edit_"' + i + ' onclick="javascript:SetEditRelation(this);" style="margin-right:10px;">';
                                str += "<i class='fa fa-edit'></i>";
                                str += "</a>";

                                str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                                str += "<i class='fa fa-plus-circle'></i>";
                                str += "</a>";
                                str += "</div></td>";
                                str += '<tr>';
                            }
                        }
                        else {
                            existsFlg = true;
                            str += '<tr>';

                            str += '<td style="display:none;">' + arrRelative[y].ID + '</td>';
                            str += '<td style="display:none;">' + arrRelative[y].RELATION_ID + '</td>';
                            str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';

                            str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                            str += '<td>';
                            str += '<select name="Status_Relation" disabled="disabled" id="ddlStatusRelation" class="form-control">';
                            str += '<option value="">Select</option>';
                            if (arrRelative[y].status == "NotApplicable") {
                                str += '<option value="NotApplicable" selected>Not Applicable</option>';
                            }
                            else {
                                str += '<option value="NotApplicable">Not Applicable</option>';
                            }
                            if (arrRelative[y].status == "ACTIVE") {
                                str += '<option value="ACTIVE" selected>ACTIVE</option>';
                            }
                            else {
                                str += '<option value="ACTIVE">ACTIVE</option>';
                            }
                            if (arrRelative[y].status == "INACTIVE") {
                                str += '<option value="INACTIVE" selected>INACTIVE</option>';
                            }
                            else {
                                str += '<option value="INACTIVE">INACTIVE</option>';
                            }

                            str += '</select>';
                            str += '</td>';
                            str += '<td><input id="txtName" disabled="disabled" type="text" class="form-control" autocomplete="off" value="' + arrRelative[y].relativeName + '" /></td>';
                            str += '<td><input id="txtEmail" type="text" disabled="disabled" class="form-control" autocomplete="off" value="' + arrRelative[y].relativeEmail + '" /></td>';
                            str += '<td>';
                            str += '<select name="identification_type_relation" disabled="disabled" id="ddlIdentificationTypeRelation" class="form-control validatepan">';
                            str += '<option value="">Select</option>';
                            if (arrRelative[y].identificationType == "NotApplicable") {
                                str += '<option value="NotApplicable" selected>Not Applicable</option>';
                            }
                            else {
                                str += '<option value="NotApplicable">Not Applicable</option>';
                            }

                            if (arrRelative[y].identificationType == "PAN") {
                                str += '<option value="PAN" selected>PAN</option>';
                            }
                            else {
                                str += '<option value="PAN">PAN</option>';
                            }
                            if (arrRelative[y].identificationType == "DRIVING_LICENSE") {
                                str += '<option value="DRIVING_LICENSE" selected>DRIVING LICENSE</option>';
                            }
                            else {
                                str += '<option value="DRIVING_LICENSE">DRIVING LICENSE</option>';
                            }
                            if (arrRelative[y].identificationType == "AADHAR_CARD") {
                                str += '<option value="AADHAR_CARD" selected>AADHAR CARD</option>';
                            }
                            else {
                                str += '<option value="AADHAR_CARD">AADHAR CARD</option>';
                            }
                            if (arrRelative[y].identificationType == "PASSPORT") {
                                str += '<option value="PASSPORT" selected>PASSPORT</option>';
                            }
                            else {
                                str += '<option value="PASSPORT">PASSPORT</option>';
                            }
                            str += '</select>';
                            str += '</td> ';

                            if (arrRelative[y].identificationType == "PAN") {
                                str += '<td><input id="txtIdentificationNumberRelation" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="' + arrRelative[y].panNumber + '" /></td>';
                            }
                            else {
                                str += '<td><input id="txtIdentificationNumberRelation" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="' + arrRelative[y].identificationNumber + '" /></td>';
                            }
                            str += '<td><input id="txtAddressRelation" type="text" disabled="disabled" class="form-control" autocomplete="off" value="' + arrRelative[y].address + '" /></td>';
                            str += '<td><input id="txtPhoneRelation" type="text" disabled="disabled" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" value="' + arrRelative[y].mobile + '" /></td>';
                            str += '<td><input id="txtdpPan" disabled="disabled" type="checkbox" /></td>';
                            str += "<td><div class='tools'>";

                            str += '<a id="edit_"' + i + ' onclick="javascript:SetEditRelation(this);" style="margin-right:10px;">';
                            str += "<i class='fa fa-edit'></i>";
                            str += "</a>";

                            str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                            str += "<i class='fa fa-plus-circle'></i>";
                            str += "</a>";
                            str += "</div></td>";
                            str += '<tr>';
                        }
                    }
                }
                if (existsFlg == false) {
                    str += '<tr>';
                    str += '<td style="display:none;">0</td>';
                    str += '<td style="display:none;">' + arrRelations[x].RELATION_ID + '</td>';
                    str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';
                    str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                    str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                    str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><input id="txtEmail"  type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                    str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                    str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                    str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                    str += "<td><div class='tools'>";
                    str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                    str += "<i class='fa fa-plus-circle'></i>";
                    str += "</a>";
                    str += "</div></td>";
                    str += '<tr>';
                }
            }
        }
        $("#tbdRelativeList").html();
        $("#tbdRelativeList").html(str);
    }
    else {
        //alert("In msg.User.lstRelative null case");
        var str = "";
        //alert("isMarried=" + isMarried);
        if (arrRelations != null) {
            for (var x = 0; x < arrRelations.length; x++) {
                if (isMarried == "No") {
                    if (arrRelations[x].RELATION_NM == "Spouse") {
                        //alert("Here in spouse and not married");
                        str += '<tr>';
                        str += '<td style="display:none;">0</td>';
                        str += '<td style="display:none;">' + arrRelations[x].RELATION_ID + '</td>';
                        str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';
                        str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                        str += '<td><select disabled="disabled" name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable" selected>Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                        str += '<td><input disabled="disabled" id="txtName" type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                        str += '<td><input disabled="disabled" id="txtEmail"  type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                        str += '<td><select disabled="disabled" name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable" selected>Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                        str += '<td><input disabled="disabled" id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" value="Not Applicable" /></td>';
                        str += '<td><input disabled="disabled" id="txtAddressRelation" type="text" class="form-control" autocomplete="off" value="Not Applicable" /></td>';
                        str += '<td><input disabled="disabled" id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" value="Not Applicable" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                        str += '<td><input disabled="disabled" id="txtdpPan" type="checkbox" /></td>';
                        str += "<td>";
                        //str += "<div class='tools'>";
                        //str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                        //str += "<i class='fa fa-plus-circle'></i>";
                        //str += "</a>";
                        str += "</div>";
                        str += "</td>";
                        str += '<tr>';
                    }
                    else {
                        str += '<tr>';
                        str += '<td style="display:none;">0</td>';
                        str += '<td style="display:none;">' + arrRelations[x].RELATION_ID + '</td>';
                        str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';
                        str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                        str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                        str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                        str += '<td><input id="txtEmail"  type="text" class="form-control" autocomplete="off" /></td>';
                        str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                        str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                        str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                        str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                        str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                        str += "<td><div class='tools'>";
                        str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                        str += "<i class='fa fa-plus-circle'></i>";
                        str += "</a>";
                        str += "</div></td>";
                        str += '<tr>';
                    }
                }
                else {
                    str += '<tr>';
                    str += '<td style="display:none;">0</td>';
                    str += '<td style="display:none;">' + arrRelations[x].RELATION_ID + '</td>';
                    str += '<td style="display:none;">' + arrRelations[x].IS_MANDATORY + '</td>';
                    str += '<td>' + arrRelations[x].RELATION_NM + '</td> ';
                    str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                    str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><input id="txtEmail"  type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                    str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                    str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                    str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                    str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                    str += "<td><div class='tools'>";
                    str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                    str += "<i class='fa fa-plus-circle'></i>";
                    str += "</a>";
                    str += "</div></td>";
                    str += '<tr>';
                }
            }
        }
        $("#tbdRelativeList").html();
        $("#tbdRelativeList").html(str);
    }


    $("select[id*=ddlStatusRelation]").on('change', function () {
        //alert("In relation status onchange");
        fnRelationStatusOnChange($(this));
    });
}
function fnGetRelationList(RelativeData) {
    //debugger;
    $("#Loader").show();
    var webUrl = uri + "/api/Relation/GetRelationForRelative";
    $.ajax({
        type: "POST",
        url: webUrl,
        data: JSON.stringify({
            COMPANY_ID: 0
        }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: true,
        success: function (msg) {
            if (isJson(msg)) {
                msg = JSON.parse(msg);
            }
            if (msg.StatusFl == true) {
                $("#Loader").hide();
                var str = "";                
                if (RelativeData != null || RelativeData != '' || RelativeData != undefined) {
                    str += RelativeData;
                }
                if (msg.RelationList != null) {
                    for (var i = 0; i < msg.RelationList.length; i++) {
                        str += '<tr>';
                        str += '<td style="display:none;">0</td>';
                        str += '<td style="display:none;">' + msg.RelationList[i].RELATION_ID + '</td>';
                        str += '<td>' + msg.RelationList[i].RELATION_NM + '</td>';
                        //alert(isMarried);
                        if (isMarried == "No") {
                            if (msg.RelationList[i].RELATION_NM == "Spouse") {
                                str += '<td><select name="Status_Relation" disabled="disabled" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable" selected="true">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                                str += '<td><input id="txtName" value="Not Applicable" disabled="disabled" type="text" class="form-control" autocomplete="off" /></td>';
                                str += '<td><input id="txtEmail" value="Not Applicable" type="text" disabled="disabled" class="form-control" autocomplete="off" /></td>';
                                str += '<td><select name="identification_type_relation" disabled="disabled" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option selected="true" value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                                str += '<td><input id="txtIdentificationNumberRelation" value="Not Applicable" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                                str += '<td><input id="txtAddressRelation" type="text" value="Not Applicable" disabled="disabled" class="form-control" autocomplete="off" /></td>';
                                str += '<td><input id="txtPhoneRelation" type="text" value="Not Applicable" disabled="disabled" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                                str += '<td style="display:none;"></td>';
                                str += '<td><input id="txtdpPan" disabled="disabled" type="checkbox" /></td>';
                                //str += "<td><div class='tools'>";
                                //str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                                //str += "<i class='fa fa-plus-circle'></i>";
                                //str += "</a>";
                                //str += "</div></td>";
                                str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                            }
                            else {
                                str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                                str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                                str += '<td><input id="txtEmail" type="text" class="form-control" autocomplete="off" /></td>';
                                str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                                str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                                str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                                str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                                str += '<td style="display:none;"></td>';
                                str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                                str += "<td><div class='tools'>";
                                str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                                str += "<i class='fa fa-plus-circle'></i>";
                                str += "</a>";
                                str += "</div></td>";
                                str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                            }
                        }
                        else {
                            str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                            str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                            str += '<td><input id="txtEmail" type="text" class="form-control" autocomplete="off" /></td>';
                            str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                            str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                            str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                            str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                            str += '<td style="display:none;"></td>';
                            str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                            str += "<td><div class='tools'>";
                            str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                            str += "<i class='fa fa-plus-circle'></i>";
                            str += "</a>";
                            str += "</div></td>";
                            str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                        }
                    }
                }
                $("#tbdRelativeList").html();
                $("#tbdRelativeList").html(str);
            }
            else {
                $("#Loader").hide();
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    //alert(msg.Msg);
                    $("#tbdRelativeList").html(RelativeData);
                    return false;
                }
            }
        },
        error: function (response) {
            $("#Loader").hide();
            //alert(response.status + ' ' + response.statusText);
        }
    });
}
function fnDeleteRelativeDetail() {
    var selectedTr = $(event.currentTarget).closest('tr').children();
    var relativeId = $(selectedTr[0]).html();

    deleteRelativeDetailElement = $(event.currentTarget).closest('tr');
    $("#txtDeleteRelativeDetailId").val(relativeId);
}
function fnDeleteRelativeDetailModal() {
    if ($("#txtDeleteRelativeDetailId").val() == "0") {
        if (deleteRelativeDetailElement != null) {
            deleteRelativeDetailElement.remove();
            deleteRelativeDetailElement = null;
            alert("Record has been deleted successfully!");
        }
    }
    else {
        $("#Loader").show();
        var webUrl = uri + "/api/Transaction/DeleteRelativeDetail";
        $.ajax({
            url: webUrl,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            data: JSON.stringify({
                relativeInfo: { ID: $("#txtDeleteRelativeDetailId").val() }
            }),
            success: function (msg) {
                $("#Loader").hide();
                if (isJson(msg)) {
                    msg = JSON.parse(msg);
                }
                if (msg.StatusFl == true) {
                    if (deleteRelativeDetailElement != null) {
                        deleteRelativeDetailElement.remove();
                        deleteRelativeDetailElement = null;
                        alert("Record has been deleted successfully!");
                        fnGetRelativeInfo();
                    }

                }
                else {
                    if (msg.Msg == "SessionExpired") {
                        alert("Your session is expired. Please login again to continue");
                        window.location.href = "../LogOut.aspx";
                    }
                    else {
                        alert(msg.Msg);
                        return false;
                    }
                }
            },
            error: function (response) {
                $("#Loader").hide();
                alert(response.status + ' ' + response.statusText);
            }
        })
    }
}
function fnOpenModalAddRelativeDetail() {
    $("#ddlIdentificationTypeRelation").prop('disabled', true);
    $("#txtIdentificationNumberRelation").prop('disabled', true);
}
function fnGetRelativeInfo() {
    $("#Loader").show();
    var webUrl = uri + "/api/UserIT/GetRelativeList";
    $.ajax({
        url: webUrl,
        type: "GET",
        data: {},
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        success: function (msg) {
            if (msg.StatusFl == true) {
                $("#Loader").hide();
                var str = "";
                if (msg.User.lstRelative !== null) {

                    for (var i = 0; i < msg.User.lstRelative.length; i++) {

                        str += '<tr>';
                        str += '<td style="display:none;">' + msg.User.lstRelative[i].ID + '</td>';
                        str += '<td style="display:none;">' + msg.User.lstRelative[i].relation.RELATION_ID + '</td>';
                        str += '<td>' + msg.User.lstRelative[i].relation.RELATION_NM + '</td>';
                        str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control" disabled="disabled"><option value="' + msg.User.lstRelative[i].status + '">' + (msg.User.lstRelative[i].status == "NotApplicable" ? "Not Applicable" : msg.User.lstRelative[i].status) + '</option></select></td>';
                        str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" disabled="disabled" value="' + msg.User.lstRelative[i].relativeName + '" /></td>';
                        str += '<td><input id="txtEmail" type="text" class="form-control" autocomplete="off" disabled="disabled" value="' + msg.User.lstRelative[i].relativeEmail + '" /></td>';
                        str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" disabled="disabled" class="form-control validatepan"><option value="' + msg.User.lstRelative[i].identificationType + '">' + (msg.User.lstRelative[i].identificationType == "NotApplicable" ? "Not Applicable" : msg.User.lstRelative[i].identificationType) + '</option></select></td>';
                        str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control text-uppercase validatepan" disabled="disabled" name="identification_number_relation" autocomplete="off" value="' + msg.User.lstRelative[i].identificationNumber + '" /></td>';
                        str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" disabled="disabled" value="' + msg.User.lstRelative[i].address + '" /></td>';
                        str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" disabled="disabled" value="' + msg.User.lstRelative[i].mobile + '" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                        str += '<td style="display:none;"></td>';
                        str += '<td>';
                        if ((msg.User.lstRelative[i].IsdesignatedPerson).toUpperCase() == "YES") {
                            str += '<input id="txtdpPan" type="checkbox" checked="checked" disabled="disabled" />';
                        }
                        else {
                            str += '<input id="txtdpPan" type="checkbox" disabled="disabled" />';
                        }
                        str += '</td>';
                        str += "<td><div class='tools'>";
                        str += '<a id="edit_"' + i + ' onclick="javascript:SetEditRelation(this);" style="margin-right:10px;">';
                        str += "<i class='fa fa-edit'></i>";
                        str += "</a>";
                        str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                        str += "<i class='fa fa-plus-circle'></i>";
                        str += "</a>";
                        if (msg.User.lstRelative[i].isDeleteRelative) {
                            str += "<a data-target='#modalDeleteRelativeDetail' data-toggle='modal' onclick=\'javascript:fnDeleteRelativeDetail(this);\' style='color:red;margin-left:10px;'>";
                            str += "<i class='fa fa-trash'></i>";
                            str += "</a>";
                        }
                        str += "</div></td>";
                        str += '</tr>';

                    }
                }
                fnGetRelationList(str);
            }
            else {
                $("#Loader").hide();
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    // alert(msg.Msg);
                    return false;
                }
            }

        },
        error: function (response) {
            $("#Loader").hide();
            alert(response.status + ' ' + response.statusText);
        }
    })
}
function addDropDownRowRelative(cntrl) {
    //debugger;
    $tr = $(cntrl).closest('tr');
    //$newRow = $tr.clone();
    var sRelationNm = $($tr.children()[3]).html();
    var sRelaionId = $($tr.children()[1]).html();
    var isMandatory = $($tr.children()[2]).html();
    //alert('sRelationNm=' + sRelationNm);
    //alert('sRelaionId=' + sRelaionId);
    var str = "";
    str += '<tr>';
    str += '<td style="display:none;">0</td>';
    str += '<td style="display:none;">' + sRelaionId + '</td>';
    str += '<td style="display:none;">' + isMandatory + '</td>';
    str += '<td>' + sRelationNm + '</td> ';
    str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
    str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
    str += '<td><input id="txtEmail"  type="text" class="form-control" autocomplete="off" /></td>';
    str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
    str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
    str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
    str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
    str += '<td><input id="txtdpPan" type="checkbox" /></td>';
    str += "<td><div class='tools'>";
    str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
    str += "<i class='fa fa-plus-circle'></i>";
    str += "</a>";

    str += "<a onclick=\'javascript:fnRmvRelativeRow(this);\' style='color:red;margin-left:10px;'>";
    str += "<i class='fa fa-trash'></i>";
    str += "</a>";

    str += "</div></td>";
    str += '<tr>';

    $tr.after(str);

    $("select[id*=ddlStatusRelation]").on('change', function () {
        alert("In relation status onchange");
        fnRelationStatusOnChange($(this));
    });
}
function fnGetRelations() {
    $("#Loader").show();
    var webUrl = uri + "/api/Relation/GetRelationForDeclaration";
    $.ajax({
        type: "POST",
        url: webUrl,
        data: JSON.stringify({
            COMPANY_ID: 0
        }),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        success: function (msg) {
            if (isJson(msg)) {
                msg = JSON.parse(msg);
            }
            if (msg.StatusFl == true) {
                $("#Loader").hide();
                arrRelations = new Array();
                arrRelations = msg.RelationList;
                //var str = "";
                //if (RelativeData != null || RelativeData != '' || RelativeData != undefined) {
                //    str += RelativeData;
                //}
                //if (msg.RelationList != null) {
                //    for (var i = 0; i < msg.RelationList.length; i++) {
                //        str += '<tr>';
                //        str += '<td style="display:none;">0</td>';
                //        str += '<td style="display:none;">' + msg.RelationList[i].RELATION_ID + '</td>';
                //        str += '<td>' + msg.RelationList[i].RELATION_NM + '</td>';
                //        //alert(isMarried);
                //        if (isMarried == "No") {
                //            if (msg.RelationList[i].RELATION_NM == "Spouse") {
                //                str += '<td><select name="Status_Relation" disabled="disabled" id="ddlStatusRelation" class="form-control"><option value="">Select</option><option value="NotApplicable" selected="true">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                //                str += '<td><input id="txtName" value="Not Applicable" disabled="disabled" type="text" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><input id="txtEmail" value="Not Applicable" type="text" disabled="disabled" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><select name="identification_type_relation" disabled="disabled" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="">Select</option><option selected="true" value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                //                str += '<td><input id="txtIdentificationNumberRelation" value="Not Applicable" disabled="disabled" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                //                str += '<td><input id="txtAddressRelation" type="text" value="Not Applicable" disabled="disabled" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><input id="txtPhoneRelation" type="text" value="Not Applicable" disabled="disabled" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                //                str += '<td style="display:none;"></td>';
                //                str += '<td><input id="txtdpPan" disabled="disabled" type="checkbox" /></td>';
                //                //str += "<td><div class='tools'>";
                //                //str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                //                //str += "<i class='fa fa-plus-circle'></i>";
                //                //str += "</a>";
                //                //str += "</div></td>";
                //                str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                //            }
                //            else {
                //                str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                //                str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><input id="txtEmail" type="text" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                //                str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                //                str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                //                str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                //                str += '<td style="display:none;"></td>';
                //                str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                //                str += "<td><div class='tools'>";
                //                str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                //                str += "<i class='fa fa-plus-circle'></i>";
                //                str += "</a>";
                //                str += "</div></td>";
                //                str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                //            }
                //        }
                //        else {
                //            str += '<td><select name="Status_Relation" id="ddlStatusRelation" class="form-control"><option value="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="ACTIVE">ACTIVE</option> <option value="INACTIVE">INACTIVE</option></select></td>';
                //            str += '<td><input id="txtName" type="text" class="form-control" autocomplete="off" /></td>';
                //            str += '<td><input id="txtEmail" type="text" class="form-control" autocomplete="off" /></td>';
                //            str += '<td><select name="identification_type_relation" id="ddlIdentificationTypeRelation" class="form-control validatepan"><option value="" disabled="" selected="true">Select</option><option value="NotApplicable">Not Applicable</option><option value="PAN">PAN</option><option value="DRIVING_LICENSE">DRIVING LICENSE</option><option value="AADHAR_CARD">AADHAR CARD</option><option value="PASSPORT">PASSPORT</option></select></td>';
                //            str += '<td><input id="txtIdentificationNumberRelation" type="text" class="form-control validatepan text-uppercase" name="identification_number_relation" autocomplete="off" /></td>';
                //            str += '<td><input id="txtAddressRelation" type="text" class="form-control" autocomplete="off" /></td>';
                //            str += '<td><input id="txtPhoneRelation" type="text" maxlength="10" class="form-control" autocomplete="off" onkeypress="return event.charCode >= 48 && event.charCode <= 57" /></td>';
                //            str += '<td style="display:none;"></td>';
                //            str += '<td><input id="txtdpPan" type="checkbox" /></td>';
                //            str += "<td><div class='tools'>";
                //            str += "<a onclick='javascript:addDropDownRowRelative(this);'>";
                //            str += "<i class='fa fa-plus-circle'></i>";
                //            str += "</a>";
                //            str += "</div></td>";
                //            str += '<td style="display:none;">' + msg.RelationList[i].IS_MANDATORY + '</td>';
                //        }
                //    }
                //}
                //$("#tbdRelativeList").html();
                //$("#tbdRelativeList").html(str);
            }
            else {
                $("#Loader").hide();
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                else {
                    //alert(msg.Msg);
                    $("#tbdRelativeList").html(RelativeData);
                    return false;
                }
            }
        },
        error: function (response) {
            $("#Loader").hide();
            //alert(response.status + ' ' + response.statusText);
        }
    });
}
function fnRmvRelativeRow(cntrl) {
    var obj = $(cntrl).closest('tr');
    $(obj).remove();
}
function fnRelationStatusOnChange(cntrl) {
    if (cntrl.val() == "NotApplicable") {
        var cntrlStatus = $($(cntrl).closest('tr').children()[4]).find("select[id*=ddlStatusRelation]");
        var cntrlIdentype = $($(cntrl).closest('tr').children()[7]).find("select[id*=ddlIdentificationTypeRelation]");
        var cntrlName = $($(cntrl).closest('tr').children()[5]).find("input[id*=txtName]");
        var cntrlEmail = $($(cntrl).closest('tr').children()[6]).find("input[id*=txtEmail]");
        var cntrlIdenNo = $($(cntrl).closest('tr').children()[8]).find("input[id*=txtIdentificationNumberRelation]");
        var cntrlAddress = $($(cntrl).closest('tr').children()[9]).find("input[id*=txtAddressRelation]");
        var cntrlPhone = $($(cntrl).closest('tr').children()[10]).find("input[id*=txtPhoneRelation]");
        var cntrlIsDesignated = $($(cntrl).closest('tr').children()[11]).find("input[id*=txtdpPan]");

        $(cntrlName).val("Not Applicable");
        $(cntrlEmail).val("Not Applicable");
        $(cntrlIdenNo).val("Not Applicable");

        $(cntrlIsDesignated).prop("disabled", true);
        $(cntrlName).attr("disabled", "disabled");
        $(cntrlEmail).attr("disabled", "disabled");
        $(cntrlIdentype).attr("disabled", "disabled");
        $(cntrlIdenNo).attr("disabled", "disabled");
        $(cntrlAddress).attr("disabled", "disabled");
        $(cntrlPhone).attr("disabled", "disabled");
        $(cntrlStatus).attr("disabled", "disabled");
    }
}