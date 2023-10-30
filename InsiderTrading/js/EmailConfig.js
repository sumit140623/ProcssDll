﻿$(document).ready(function () {
    $("input[name=radioAuthenType]").change(function () {
        var autneticateValue = $(this).val();
        if (autneticateValue == "isBasic") {
            document.getElementById("divBasic").style.display = "block";
            document.getElementById("divSmart").style.display = "none";

            $("#btnBasicSave").show();
            $("#btnSmartSave").hide();
            //document.getElementById("btnBasicSave").style.display = "block";
            //document.getElementById("btnSmartSave").style.display = "none";
        }
        else if (autneticateValue == "isSmart") {
            document.getElementById("divSmart").style.display = "block";
            document.getElementById("divBasic").style.display = "none";

            $("#btnBasicSave").hide();
            $("#btnSmartSave").show();
            //document.getElementById("btnSmartSave").style.display = "block";
            //document.getElementById("btnBasicSave").style.display = "none";
        }
        else {
            document.getElementById("divBasic").style.display = "none";
            document.getElementById("divSmart").style.display = "none";

            $("#btnSmartSave").hide();
            $("#btnBasicSave").hide();
            //document.getElementById("btnBasicSave").style.display = "none";
            //document.getElementById("btnSmartSave").style.display = "none";
        }
    });
    $("#ddlSmart").change(function () {
        var value = $('option:selected', this).val();
        if (value == "Office 365") {
            document.getElementById("divOffice").style.display = "block";
            document.getElementById("divGoogle").style.display = "none";
            //document.getElementById("btnSignIn").style.display = "block";
        }
        else if (value == "Google") {
            document.getElementById("divGoogle").style.display = "block";
            document.getElementById("divOffice").style.display = "none";
            //document.getElementById("btnSignIn").style.display = "none";
        }
        else {
            document.getElementById("divOffice").style.display = "none";
            document.getElementById("divGoogle").style.display = "none";
            //document.getElementById("btnSignIn").style.display = "none";
        }
    });
    fnGetEmailConfig();
    //$("#btnSignIn").click(fnLaunchUrl());
});
function fnLaunchUrl() {
    //alert("In function fnLaunchUrl()");
    if ($("#txtClientIdOffice").val() != "" && $("#txtClientIdOffice").val() != null && $("#txtClientSecretOffice").val() != ""
        && $("#txtClientSecretOffice").val() != null && $("#txtTenantIdOffice").val() != "" && $("#txtTenantIdOffice").val() != null) {
        //alert("In all filled");
        var __CHILD_WINDOW_HANDLE = window.open('Office365Token.aspx', '_blank', 'width=700,height=500,left=200,top=100');
        //window.open("Office365Token.aspx");
    }
    else {
        //alert("In all not filled");
    }
}
function fnGetEmailConfig() {
    $("#Loader").show();
    var webUrl = uri + "/api/EmailConfig/GetEmailConfig";
    $.ajax({
        type: "POST",
        url: webUrl,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (msg) {
            if (msg.StatusFl == true) {
                if (msg.emailConfig.AuthenticationType == "Basic") {
                    var radioButton = document.getElementById("isBasic");
                    radioButton.checked = true;

                    $("#divBasic").show();
                    $("#divSmart").hide();

                    $("input[id*=txtConfigId]").val(msg.emailConfig.ConfigId);
                    $("select[id*=ddlUPSITyp]").val(msg.emailConfig.UpsiTypId);
                    $("input[id=txtBasicEmail]").val(msg.emailConfig.UPSIEmail);
                    $("input[id*=txtOutgoingProtocol]").val(msg.emailConfig.OutgoingProtocol);
                    $("input[id*=txtOutgoingPort]").val(msg.emailConfig.OutgoingPort);
                    $("input[id*=txtBasicEmailDisplayNm]").val(msg.emailConfig.DisplayNm);

                    if (msg.emailConfig.ProtocolType == "Imap") {
                        radioButton = document.getElementById("isBasicPop");
                        radioButton.checked = false;

                        radioButton = document.getElementById("isBasicImap");
                        radioButton.checked = true;
                    }
                    else if (msg.emailConfig.ProtocolType == "Pop") {
                        radioButton = document.getElementById("isBasicPop");
                        radioButton.checked = true;

                        radioButton = document.getElementById("isBasicImap");
                        radioButton.checked = false;
                    }

                    $("input[id*=txtIncomingProtocol]").val(msg.emailConfig.IncomingProtocol);
                    $("input[id*=txtIncomingPort]").val(msg.emailConfig.IncomingPort);
                    $("select[id*=ddlBasicSSL]").val(msg.emailConfig.IsSSL);
                    $("input[id*=txtBasicPwd]").val(msg.emailConfig.Password);
                    $("input[id*=txtBasicPwd]").val(msg.emailConfig.Password);

                    $("#btnBasicSave").show();
                    $("#btnSmartSave").hide();
                }
                else if (msg.emailConfig.AuthenticationType == "Smart") {
                    var radioButton = document.getElementById("isSmart");
                    radioButton.checked = true;
                    $("input[id*=txtConfigId]").val(msg.emailConfig.ConfigId);
                    $("select[id*=ddlUPSITyp]").val(msg.emailConfig.UpsiTypId);

                    $("#divBasic").hide();
                    $("#divSmart").show();

                    $("select[id*=ddlSmart]").val(msg.emailConfig.SmartType);
                    if (msg.emailConfig.SmartType == "Office 365") {
                        document.getElementById("divOffice").style.display = "block";
                        document.getElementById("divGoogle").style.display = "none";

                        $("input[id*=txtClientIdOffice]").val(msg.emailConfig.ClientId);
                        $("input[id*=txtClientSecretOffice]").val(msg.emailConfig.ClientCertificate);
                        $("input[id*=txtTenantIdOffice]").val(msg.emailConfig.TenantId);
                        $("input[id*=txtAuthenticationEmail]").val(msg.emailConfig.AuthenticationEmail);

                        $("input[id*=txtToken]").val(msg.emailConfig.AccessToken);
                        $("input[id*=txtRToken]").val(msg.emailConfig.RefreshToken);
                    }
                    else if (msg.emailConfig.SmartType == "Google") {
                        document.getElementById("divGoogle").style.display = "block";
                        document.getElementById("divOffice").style.display = "none";
                        $("input[id*=txtGoogleServiceAccouontEmail]").val(msg.emailConfig.GoogleServiceAccount);
                    }
                    else {
                        document.getElementById("divOffice").style.display = "none";
                        document.getElementById("divGoogle").style.display = "none";
                    }
                    //alert("msg.emailConfig.DisplayNm=" + msg.emailConfig.DisplayNm);
                    $("input[id*=txtSmartEmailDisplayNm]").val(msg.emailConfig.DisplayNm);
                    $("input[id=txtSmartEmail]").val(msg.emailConfig.UPSIEmail);
                    $("input[id*=hdnSmartEmail]").val(msg.emailConfig.UPSIEmail);
                    $("input[id*=txtSmartOutgoingProtocol]").val(msg.emailConfig.OutgoingProtocol);
                    $("input[id*=txtSmartOutgoingPort]").val(msg.emailConfig.OutgoingPort);

                    if (msg.emailConfig.ProtocolType == "Imap") {
                        radioButton = document.getElementById("isSmartPop");
                        radioButton.checked = false;

                        radioButton = document.getElementById("isSmartImap");
                        radioButton.checked = true;
                    }
                    else if (msg.emailConfig.ProtocolType == "Pop") {
                        radioButton = document.getElementById("isSmartPop");
                        radioButton.checked = true;

                        radioButton = document.getElementById("isSmartImap");
                        radioButton.checked = false;
                    }

                    $("input[id=txtSmartIncomingProtocol]").val(msg.emailConfig.IncomingProtocol);
                    $("input[id=txtSmartIncomingPort]").val(msg.emailConfig.IncomingPort);
                    $("select[id*=ddlSmartSSL]").val(msg.emailConfig.IsSSL);

                    $("#btnBasicSave").hide();
                    $("#btnSmartSave").show();
                }
                $("#Loader").hide();
            }
            else {
                $("#Loader").hide();
            }
        },
        error: function (response) {
            $("#Loader").hide();
            alert(response.status + ' ' + response.statusText);
        }
    });
}
function fnValidateBasic() {
    //var UpsiTyp = $("#ContentPlaceHolder1_ddlUPSITyp").val();
    var BasicEmail = $("#txtBasicEmail").val();
    var OutgoingProtocol = $("#txtOutgoingProtocol").val();
    var OutgoingPort = $("#txtOutgoingPort").val();
    var ProtocolType = "";
    if ($("#isBasicPop").prop("checked")) {
        ProtocolType = "Pop";
    }
    else if ($("#isBasicImap").prop("checked")) {
        ProtocolType = "Imap";
    }
    else if ($("#isBasicExchange").prop("checked")) {
        ProtocolType = "Exchange";
    }
    var IncomingProtocol = $("#txtIncomingProtocol").val();
    var IncomingPort = $("#txtIncomingPort").val();
    var BasicSSL = $("#ddlBasicSSL").val();
    var Password = $("#txtBasicPwd").val();
    var DisplayNm = $("#txtBasicEmailDisplayNm").val();

    //if (UpsiTyp == "" || UpsiTyp == null) {
    //    alert("Please select UPSI nature");
    //    return false;
    //}
    if (DisplayNm == "" || DisplayNm == null) {
        alert("Please enter Display Name");
        return false;
    }
    if (BasicEmail == "" || BasicEmail == null) {
        alert("Please enter UPSI email address");
        return false;
    }
    if (OutgoingProtocol == "" || OutgoingProtocol == null) {
        alert("Please enter UPSI Outgoing Protocol");
        return false;
    }
    if (OutgoingPort == "" || OutgoingPort == null) {
        alert("Please enter UPSI Outgoing Port");
        return false;
    }
    if (ProtocolType == "" || ProtocolType == null) {
        alert("Please select UPSI email's protocol");
        return false;
    }
    if (IncomingProtocol == "" || IncomingProtocol == null) {
        alert("Please enter Incoming Protocol");
        return false;
    }
    if (IncomingPort == "" || IncomingPort == null) {
        alert("Please select UPSI Incoming Port");
        return false;
    }
    if (BasicSSL == "" || BasicSSL == null || BasicSSL == "0") {
        alert("Please select UPSI SSL type");
        return false;
    }
    if (Password == "" || Password == null) {
        alert("Please select UPSI email's password");
        return false;
    }
    return true;
}
function saveEmailConfigBasic() {
    if (fnValidateBasic()) {
        var ConfigId = $("#txtConfigId").val();
        //var UpsiTypId = $("#ContentPlaceHolder1_ddlUPSITyp").val();
        var DisplayNm = $("#txtBasicEmailDisplayNm").val();
        var BasicEmail = $("#txtBasicEmail").val();
        var OutgoingProtocol = $("#txtOutgoingProtocol").val();
        var OutgoingPort = $("#txtOutgoingPort").val();
        var ProtocolType = "";
        if ($("#isBasicPop").prop("checked")) {
            ProtocolType = "Pop";
        }
        else if ($("#isBasicImap").prop("checked")) {
            ProtocolType = "Imap";
        }
        else if ($("#isBasicExchange").prop("checked")) {
            ProtocolType = "Exchange";
        }
        var IncomingProtocol = $("#txtIncomingProtocol").val();
        var IncomingPort = $("#txtIncomingPort").val();
        var BasicSSL = $("#ddlBasicSSL").val();
        var Password = $("#txtBasicPwd").val();

        $("#Loader").show();
        var webUrl = uri + "/api/EMAILConfig/AddBasicEmailConfig";
        $.ajax({
            url: webUrl,
            type: "POST",
            data: JSON.stringify({
                AuthenticationType: 'Basic', DisplayNm:DisplayNm, UPSIEmail: BasicEmail, OutgoingProtocol: OutgoingProtocol, OutgoingPort: OutgoingPort,
                ProtocolType: ProtocolType, IncomingProtocol: IncomingProtocol, IncomingPort: IncomingPort, IsSSL: BasicSSL, Password: Password,
                ConfigId: ConfigId
            }),
            async: false,
            success: function (msg) {
                $("#Loader").hide();
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                if (msg.StatusFl == true) {
                    window.location.reload();
                }
                else {
                    alert(msg.Msg);
                }
            },
            error: function (response) {
                $("#Loader").hide();
                if (response.responseText == "Session Expired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                    return false;
                }
                else {
                    alert(response.status + ' ' + response.statusText);
                }
            }
        });
    }
}
function fnValidateSmart() {
    //var UpsiTyp = $("#ContentPlaceHolder1_ddlUPSITyp").val();
    var SmartType = $("#ddlSmart").val();
    //Office 365
    var ClientId = $("#txtClientIdOffice").val();
    var ClientCertificate = $("#txtClientSecretOffice").val();
    var TenantId = $("#txtTenantIdOffice").val();
    var AuthenticationEmail = $("#txtAuthenticationEmail").val();
    var DisplayNm = $("#txtSmartEmailDisplayNm").val();
    //Google
    var GoogleServiceAccount = $("#txtGoogleServiceAccouontEmail").val();
    var GoogleCertificate = $("#txtCertificatePath").val();
    var SmartEmail = $("#txtSmartEmail").val();
    var ProtocolType = "";
    if ($("#isSmartPop").prop("checked")) {
        ProtocolType = "Pop";
    }
    else if ($("#isSmartImap").prop("checked")) {
        ProtocolType = "Imap";
    }
    var OutgoingProtocol = $("#txtSmartOutgoingProtocol").val();
    var OutgoingPort = $("#txtSmartOutgoingPort").val();
    var IncomingProtocol = $("#txtSmartIncomingProtocol").val();
    var IncomingPort = $("#txtSmartIncomingPort").val();

    /*alert("UpsiTyp=" + UpsiTyp);
    alert("SmartType=" + SmartType);
    alert("ClientId=" + ClientId);
    alert("ClientCertificate=" + ClientCertificate);
    alert("TenantId=" + TenantId);
    alert("GoogleServiceAccount=" + GoogleServiceAccount);
    alert("GoogleCertificate=" + GoogleCertificate);
    alert("SmartEmail=" + SmartEmail);
    alert("ProtocolType=" + ProtocolType);
    alert("OutgoingProtocol=" + OutgoingProtocol);
    alert("OutgoingPort=" + OutgoingPort);
    alert("IncomingProtocol=" + IncomingProtocol);
    alert("IncomingPort=" + IncomingPort);*/

    //if (UpsiTyp == "" || UpsiTyp == null) {
    //    alert("Please select UPSI nature");
    //    return false;
    //}
    if (SmartType == "" || SmartType == null || SmartType == "0") {
        alert("Please select smart type");
        return false;
    }
    if (SmartType == "Office 365") {
        if (ClientId == "" || ClientId == null) {
            alert("Please enter Client Id");
            return false;
        }
        if (ClientCertificate == "" || ClientCertificate == null) {
            alert("Please enter Client Secret");
            return false;
        }
        if (TenantId == "" || TenantId == null) {
            alert("Please enter Tenant Id");
            return false;
        }
        if (AuthenticationEmail == "" || AuthenticationEmail == null) {
            alert("Please enter Authentication Email");
            return false;
        }
    }
    else if (SmartType == "Google") {
        var GoogleServiceAccount = $("#txtGoogleServiceAccouontEmail").val();
        var GoogleCertificate = $("#txtCertificatePath").val();

        if (GoogleServiceAccount == "" || GoogleServiceAccount == null) {
            alert("Please enter Google service account email");
            return false;
        }
        if (GoogleCertificate == "" || GoogleCertificate == null) {
            alert("Please upload Google certificate");
            return false;
        }
    }
    if (DisplayNm == "" || DisplayNm == null) {
        alert("Please enter Display Name");
        return false;
    }
    if (SmartEmail == "" || SmartEmail == null) {
        alert("Please enter UPSI email address");
        return false;
    }
    if (ProtocolType == "" || ProtocolType == null) {
        alert("Please select UPSI email's protocol");
        return false;
    }
    if (OutgoingProtocol == "" || OutgoingProtocol == null) {
        alert("Please enter Outgoing protocol address");
        return false;
    }
    if (OutgoingPort == "" || OutgoingPort == null) {
        alert("Please enter Outgoing port");
        return false;
    }
    if (IncomingProtocol == "" || IncomingProtocol == null) {
        alert("Please enter Incoming protocol address");
        return false;
    }
    if (IncomingPort == "" || IncomingPort == null) {
        alert("Please enter Incoming port");
        return false;
    }

    if (SmartType == "Office 365") {
        if ($("input[id=txtSmartEmail").val() != $("input[id=hdnSmartEmail").val()) {
            if (confirm("Office 365 smart authentication require user's consent for integration. Please click OK to launch consent screen.")) {
                fnLaunchUrl();
            }
            return false;
        }
        else {
            if ($("input[id*=txtToken").val() == "" || $("input[id*=txtToken").val() == null || $("input[id*=txtRToken").val() == "" || $("input[id*=txtRToken").val() == null) {
                if (confirm("Office 365 smart authentication require user's consent for integration. Please click OK to launch consent screen.")) {
                    fnLaunchUrl();
                }
                return false;
            }
        }
    }

    return true;
}
function saveEmailConfigSmart() {
    if (fnValidateSmart()) {
        var ConfigId = $("#txtConfigId").val();
        //var UpsiTyp = $("#ContentPlaceHolder1_ddlUPSITyp").val();
        var SmartType = $("#ddlSmart").val();
        //Office 365
        var ClientId = $("#txtClientIdOffice").val();
        var ClientCertificate = $("#txtClientSecretOffice").val();
        var TenantId = $("#txtTenantIdOffice").val();
        var AuthenticationEmail = $("#txtAuthenticationEmail").val();
        
        //Google
        var GoogleServiceAccount = $("#txtGoogleServiceAccouontEmail").val();
        var GoogleCertificate = $("#txtCertificatePath").val();
        var SmartEmail = $("#txtSmartEmail").val();
        var ProtocolType = "";
        if ($("#isSmartPop").prop("checked")) {
            ProtocolType = "Pop";
        }
        else if ($("#isSmartImap").prop("checked")) {
            ProtocolType = "Imap";
        }
        var DisplayNm = $("#txtSmartEmailDisplayNm").val();
        var OutgoingProtocol = $("#txtSmartOutgoingProtocol").val();
        var OutgoingPort = $("#txtSmartOutgoingPort").val();
        var IncomingProtocol = $("#txtSmartIncomingProtocol").val();
        var IncomingPort = $("#txtSmartIncomingPort").val();
        var IsSSL = $("#ddlSmartSSL").val();

        var formData = new FormData();
        if (SmartType == "Google") {
            var arExtns = ['p12'];
            var totalFiles = document.getElementById("txtCertificatePath").files.length;
            var file = "";
            for (var i = 0; i < totalFiles; i++) {
                file = document.getElementById("txtCertificatePath").files[i];
                formData.append("file", file);
            }
            if (file == "") {
                file = downloadFileName;
            }
        }

        if (SmartType == "Office 365") {
            GoogleServiceAccount = "";
        }
        else {
            ClientId = "";
            ClientCertificate = "";
            TenantId = "";
        }
        formData.append("ConfigId", ConfigId);
        //formData.append("UpsiTypId", UpsiTyp);
        formData.append("AuthenticationType", "Smart");
        formData.append("SmartType", SmartType);
        formData.append("ClientId", ClientId);
        formData.append("ClientCertificate", ClientCertificate);
        formData.append("TenantId", TenantId);
        formData.append("GoogleServiceAccount", GoogleServiceAccount);
        formData.append("SmartEmail", SmartEmail);
        formData.append("ProtocolType", ProtocolType);
        formData.append("OutgoingProtocol", OutgoingProtocol);
        formData.append("OutgoingPort", OutgoingPort);
        formData.append("IncomingProtocol", IncomingProtocol);
        formData.append("IncomingPort", IncomingPort);
        formData.append("IsSSL", IsSSL);
        formData.append("AuthenticationEmail", AuthenticationEmail);
        formData.append("DisplayNm", DisplayNm);
        

        var sToken = $("#ContentPlaceHolder1_txtToken").val();
        var sRefToken = $("#ContentPlaceHolder1_txtRToken").val();
        var sStTime = $("#ContentPlaceHolder1_txtStTime").val();
        var sExpiresIn = $("#ContentPlaceHolder1_txtExpiresIn").val();

        formData.append("AccessToken", sToken);
        formData.append("RefreshToken", sRefToken);
        formData.append("TokenIssuedAt", sStTime);
        formData.append("TokenExpiresIn", sExpiresIn);

        $("#Loader").show();
        var webUrl = uri + "/api/EmailConfig/AddSmartEmailConfig";
        $.ajax({
            url: webUrl,
            type: "POST",
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            async: false,
            success: function (msg) {
                $("#Loader").hide();
                if (msg.Msg == "SessionExpired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                }
                if (msg.StatusFl == true) {
                    window.location.reload();
                }
                else {
                    alert(msg.Msg);
                }
            },
            error: function (response) {
                $("#Loader").hide();
                if (response.responseText == "Session Expired") {
                    alert("Your session is expired. Please login again to continue");
                    window.location.href = "../LogOut.aspx";
                    return false;
                }
                else {
                    alert(response.status + ' ' + response.statusText);
                }
            }
        });
    }
}
function saveOfficeEmailConfigSmart() {
    var ConfigId = $("#txtConfigId").val();
    var SmartType = $("#ddlSmart").val();
    //Office 365
    var ClientId = $("#txtClientIdOffice").val();
    var ClientCertificate = $("#txtClientSecretOffice").val();
    var TenantId = $("#txtTenantIdOffice").val();
    var AuthenticationEmail = $("#txtAuthenticationEmail").val();

    //Google
    var GoogleServiceAccount = $("#txtGoogleServiceAccouontEmail").val();
    var GoogleCertificate = $("#txtCertificatePath").val();
    var SmartEmail = $("#txtSmartEmail").val();
    var ProtocolType = "";
    if ($("#isSmartPop").prop("checked")) {
        ProtocolType = "Pop";
    }
    else if ($("#isSmartImap").prop("checked")) {
        ProtocolType = "Imap";
    }
    var DisplayNm = $("#txtSmartEmailDisplayNm").val();
    var OutgoingProtocol = $("#txtSmartOutgoingProtocol").val();
    var OutgoingPort = $("#txtSmartOutgoingPort").val();
    var IncomingProtocol = $("#txtSmartIncomingProtocol").val();
    var IncomingPort = $("#txtSmartIncomingPort").val();
    var IsSSL = $("#ddlSmartSSL").val();

    var formData = new FormData();
    if (SmartType == "Google") {
        var totalFiles = document.getElementById("txtCertificatePath").files.length;
        var file = "";
        for (var i = 0; i < totalFiles; i++) {
            file = document.getElementById("txtCertificatePath").files[i];
            formData.append("file", file);
        }
        if (file == "") {
            file = downloadFileName;
        }
    }
    if (SmartType == "Office 365") {
        GoogleServiceAccount = "";
    }
    else {
        ClientId = "";
        ClientCertificate = "";
        TenantId = "";

    }
    formData.append("ConfigId", ConfigId);
    formData.append("AuthenticationType", "Smart");
    formData.append("SmartType", SmartType);
    formData.append("ClientId", ClientId);
    formData.append("ClientCertificate", ClientCertificate);
    formData.append("TenantId", TenantId);
    formData.append("GoogleServiceAccount", GoogleServiceAccount);
    formData.append("SmartEmail", SmartEmail);
    formData.append("ProtocolType", ProtocolType);
    formData.append("OutgoingProtocol", OutgoingProtocol);
    formData.append("OutgoingPort", OutgoingPort);
    formData.append("IncomingProtocol", IncomingProtocol);
    formData.append("IncomingPort", IncomingPort);
    formData.append("IsSSL", IsSSL);
    formData.append("AuthenticationEmail", AuthenticationEmail);
    formData.append("DisplayNm", DisplayNm);

    var sToken = $("#ContentPlaceHolder1_txtCode").val();
    var sRefToken = $("#ContentPlaceHolder1_txtPkce").val();
    var sStTime = $("#ContentPlaceHolder1_txtStTime").val();
    var sExpiresIn = "3600";

    formData.append("AccessToken", sToken);
    formData.append("RefreshToken", sRefToken);
    formData.append("TokenIssuedAt", sStTime);
    formData.append("TokenExpiresIn", sExpiresIn);

    $("#Loader").show();
    var webUrl = uri + "/api/EmailConfig/AddSmartEmailConfigBackend";
    $.ajax({
        url: webUrl,
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        async: false,
        success: function (msg) {
            $("#Loader").hide();
            if (msg.Msg == "SessionExpired") {
                alert("Your session is expired. Please login again to continue");
                window.location.href = "../LogOut.aspx";
            }
            if (msg.StatusFl == true) {
                //window.location.reload();
            }
            else {
                alert(msg.Msg);
            }
        },
        error: function (response) {
            $("#Loader").hide();
            if (response.responseText == "Session Expired") {
                alert("Your session is expired. Please login again to continue");
                window.location.href = "../LogOut.aspx";
                return false;
            }
            else {
                alert(response.status + ' ' + response.statusText);
            }
        }
    });
}

function fnAddEmail() {
    $("#txtConfigId").val('0');
    var radioButton = document.getElementById("isBasic");
    radioButton.checked = false;

    var radioButton = document.getElementById("isSmart");
    radioButton.checked = false;

    $("#divBasic").hide();
    $("#divSmart").hide();

    $("select[id*=ddlUPSITyp]").val("");
    $("input[id*=txtBasicEmail]").val("");
    $("input[id*=txtOutgoingProtocol]").val("");
    $("input[id*=txtOutgoingPort]").val("");

    radioButton = document.getElementById("isBasicPop");
    radioButton.checked = false;

    radioButton = document.getElementById("isBasicImap");
    radioButton.checked = false;

    $("input[id*=txtIncomingProtocol]").val("");
    $("input[id*=txtIncomingPort]").val("");
    $("select[id*=ddlBasicSSL]").val("0");
    $("input[id*=txtBasicPwd]").val("");
    $("select[id*=ddlSmart]").val("0");
    $("input[id*=txtClientIdOffice]").val("");
    $("input[id*=txtClientSecretOffice]").val("");
    $("input[id*=txtTenantIdOffice]").val("");
    $("input[id*=txtGoogleServiceAccouontEmail]").val("");

    $("input[id*=txtCertificatePath]").val("");
    $("input[id*=txtSmartEmail]").val("");
    $("input[id*=hdnSmartEmail]").val("");
    $("input[id*=txtSmartOutgoingProtocol]").val("");
    $("input[id*=txtSmartOutgoingPort]").val("");

    radioButton = document.getElementById("isSmartPop");
    radioButton.checked = false;

    radioButton = document.getElementById("isSmartImap");
    radioButton.checked = false;

    $("input[id*=txtSmartIncomingProtocol]").val("");
    $("input[id*=txtSmartIncomingPort]").val("");
    $("select[id*=ddlSmartSSL]").val("0");

    $("#btnSmartSave").hide();
    $("#btnBasicSave").hide();
}
function fnEditEmail(ConfigId) {
    //alert("IN function fnEditEmail");
    //alert("ConfigId=" + ConfigId);

    $("#Loader").show();
    var webUrl = uri + "/api/UPSIConfig/GetUPSIEmailConfigById";
    $.ajax({
        url: webUrl,
        type: "POST",
        data: JSON.stringify({
            ConfigId: ConfigId
        }),
        async: false,
        success: function (msg) {
            $("#Loader").hide();
            if (msg.Msg == "SessionExpired") {
                alert("Your session is expired. Please login again to continue");
                window.location.href = "../LogOut.aspx";
            }
            if (msg.StatusFl == true) {
                if (msg.upsiEmailConfig.AuthenticationType == "Basic") {
                    var radioButton = document.getElementById("isBasic");
                    radioButton.checked = true;

                    $("#divBasic").show();
                    $("#divSmart").hide();

                    $("input[id*=txtConfigId]").val(msg.upsiEmailConfig.ConfigId);
                    $("select[id*=ddlUPSITyp]").val(msg.upsiEmailConfig.UpsiTypId);
                    $("input[id*=txtBasicEmail]").val(msg.upsiEmailConfig.UPSIEmail);
                    $("input[id*=txtOutgoingProtocol]").val(msg.upsiEmailConfig.OutgoingProtocol);
                    $("input[id*=txtOutgoingPort]").val(msg.upsiEmailConfig.OutgoingPort);

                    if (msg.upsiEmailConfig.ProtocolType == "Imap") {
                        radioButton = document.getElementById("isBasicPop");
                        radioButton.checked = false;

                        radioButton = document.getElementById("isBasicImap");
                        radioButton.checked = true;
                    }
                    else if (msg.upsiEmailConfig.ProtocolType == "Pop") {
                        radioButton = document.getElementById("isBasicPop");
                        radioButton.checked = true;

                        radioButton = document.getElementById("isBasicImap");
                        radioButton.checked = false;
                    }

                    $("input[id*=txtIncomingProtocol]").val(msg.upsiEmailConfig.IncomingProtocol);
                    $("input[id*=txtIncomingPort]").val(msg.upsiEmailConfig.IncomingPort);
                    $("select[id*=ddlBasicSSL]").val(msg.upsiEmailConfig.IsSSL);

                    $("#btnBasicSave").show();
                    $("#btnSmartSave").hide();
                }
                else if (msg.upsiEmailConfig.AuthenticationType == "Smart") {
                    var radioButton = document.getElementById("isSmart");
                    radioButton.checked = true;
                    $("input[id*=txtConfigId]").val(msg.upsiEmailConfig.ConfigId);
                    $("select[id*=ddlUPSITyp]").val(msg.upsiEmailConfig.UpsiTypId);

                    $("#divBasic").hide();
                    $("#divSmart").show();

                    $("select[id*=ddlSmart]").val(msg.upsiEmailConfig.SmartType);
                    if (msg.upsiEmailConfig.SmartType == "Office 365") {
                        document.getElementById("divOffice").style.display = "block";
                        document.getElementById("divGoogle").style.display = "none";

                        $("input[id*=txtClientIdOffice]").val(msg.upsiEmailConfig.ClientId);
                        $("input[id*=txtClientSecretOffice]").val(msg.upsiEmailConfig.ClientCertificate);
                        $("input[id*=txtTenantIdOffice]").val(msg.upsiEmailConfig.TenantId);

                        $("input[id*=txtToken]").val(msg.upsiEmailConfig.AccessToken);
                        $("input[id*=txtRToken]").val(msg.upsiEmailConfig.RefreshToken);
                    }
                    else if (msg.upsiEmailConfig.SmartType == "Google") {
                        document.getElementById("divGoogle").style.display = "block";
                        document.getElementById("divOffice").style.display = "none";
                        $("input[id*=txtGoogleServiceAccouontEmail]").val(msg.upsiEmailConfig.GoogleServiceAccount);
                    }
                    else {
                        document.getElementById("divOffice").style.display = "none";
                        document.getElementById("divGoogle").style.display = "none";
                    }

                    $("input[id=txtSmartEmail]").val(msg.upsiEmailConfig.UPSIEmail);
                    $("input[id*=hdnSmartEmail]").val(msg.upsiEmailConfig.UPSIEmail);
                    $("input[id*=txtSmartOutgoingProtocol]").val(msg.upsiEmailConfig.OutgoingProtocol);
                    $("input[id*=txtSmartOutgoingPort]").val(msg.upsiEmailConfig.OutgoingPort);

                    if (msg.upsiEmailConfig.ProtocolType == "Imap") {
                        radioButton = document.getElementById("isSmartPop");
                        radioButton.checked = false;

                        radioButton = document.getElementById("isSmartImap");
                        radioButton.checked = true;
                    }
                    else if (msg.upsiEmailConfig.ProtocolType == "Pop") {
                        radioButton = document.getElementById("isSmartPop");
                        radioButton.checked = true;

                        radioButton = document.getElementById("isSmartImap");
                        radioButton.checked = false;
                    }

                    $("input[id=txtSmartIncomingProtocol]").val(msg.upsiEmailConfig.IncomingProtocol);
                    $("input[id=txtSmartIncomingPort]").val(msg.upsiEmailConfig.IncomingPort);
                    $("select[id*=ddlSmartSSL]").val(msg.upsiEmailConfig.IsSSL);

                    $("#btnBasicSave").hide();
                    $("#btnSmartSave").show();
                }
            }
            else {
                alert(msg.Msg);
            }
        },
        error: function (response) {
            $("#Loader").hide();
            if (response.responseText == "Session Expired") {
                alert("Your session is expired. Please login again to continue");
                window.location.href = "../LogOut.aspx";
                return false;
            }
            else {
                alert(response.status + ' ' + response.statusText);
            }
        }
    });
}