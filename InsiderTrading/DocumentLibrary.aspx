﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/InsiderTrading/InsiderTradingMaster.Master" CodeBehind="DocumentLibrary.aspx.cs" Inherits="ProcsDLL.InsiderTrading.DocumentLibrary" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <%--Start Datetime--%>
    <link href="../assets/global/css/components.min.css" rel="stylesheet" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" />
    <%--End Datetime--%>
    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />

    <style>
        .requied {
            color: red;
        }

        .page-content {
            min-height: 800px !important;
        }

        table.dataTable tbody th,
        table.dataTable tbody td {
            white-space: nowrap;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <div class="page-content-inner">
        <div class="col-md-12">
            <div class="portlet light portlet-fit" style="margin-left: -15px; margin-right: -15px; min-height: 700px;">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="icon-settings font-red"></i>
                        <span class="caption-subject font-red sbold uppercase">Data Library</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <div class="col-md-12">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="btn-group-devided">
                                        <button style="display:none" runat="server" class="btn green" data-target="#BenposModal" data-toggle="modal">
                                            Upload <i class="fa fa-upload"></i>
                                        </button>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped table-hover display text-nowrap table-bordered" id="tbl-Benpos-setup">
                            <thead>
                                <tr>
                                    <th>COMPANY</th>
                                    <th>AS OF DATE</th>
                                    <th>Type</th>
                                    <th>BENPOS</th>
                                </tr>
                            </thead>
                            <tbody id="tbdBenpos">
                            </tbody>
                        </table>


                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="BenposModal" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="javascript:fnClearBenposForm();"></button>
                    <h4 class="modal-title">Benpos</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-body modal-fixheight">
                            <div class="form-group">
                                <label id="lblCompany" class="col-md-3 control-label">Company</label>
                                <div class="col-md-9">
                                    <div class="input-inline input-medium">
                                        <select id="ddlRestrictedCompanies" class="form-control" onchange="javascript:fnRemoveClass(this,'Company');">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblAsOfDate" class="col-md-3 control-label">As Of Date</label>
                                <div class="col-md-9">
                                    <div class="input-inline input-medium">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-bell-o"></i>
                                            </span>
                                            <input id="txtAsOfDate" class="form-control" onchange="javascript:fnRemoveClass(this,'AsOfDate');" type="text" value="" autocomplete="off"/>
                                            <input type="hidden" id="benposId" value="0" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblType" class="col-md-3 control-label">Type</label>
                                <div class="col-md-9">
                                    <div class="input-inline input-medium">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-bell-o"></i>
                                            </span>
                                            <select id="txtType" class="form-control" onchange="javascript:fnRemoveClass(this,'Type');">
                                                <option value="0">Please Select</option>
                                                <option value="CDSL">CDSL</option>
                                                <option value="NSDL">NSDL</option>
                                                <option value="Combined (CDSL + NSDL)">Combined (CDSL + NSDL)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblVWAP" class="col-md-3 control-label">VWAP</label>
                                <div class="col-md-9">
                                    <div class="input-inline input-medium">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <i class="fa fa-bell-o"></i>
                                            </span>
                                            <input type="number" id="txtVWAP" class="form-control" onchange="javascript:fnRemoveClass(this,'VWAP');" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <label id="lblUpload" class="col-md-3 control-label">Upload Benpos</label>&nbsp;&nbsp;   
                                    <div class="col-md-9">
                                        <div class="btn default btn-file" style="min-width: 350px; max-width: 350px">
                                            <input id="fileUploadImage" type="file" name="..." onchange="javascript:fnRemoveClass(this,'Upload','fileUploadImage');" />
                                        </div>
                                        <a id="aUserAvatarImageUploaded" href="#" target="_blank">
                                            <img src="../assets/images/arrow-download-icon.png" style="width: 30px; height: 30px;" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <label id="lblUploadESOP" class="col-md-3 control-label">Upload ESOP/Physical Shares(Allocated)</label>&nbsp;&nbsp;   
                                    <div class="col-md-9">
                                        <div class="btn default btn-file" style="min-width: 350px; max-width: 350px">
                                            <input id="fileUploadImageESOP" type="file" name="..." onchange="javascript:fnRemoveClass(this,'UploadESOP','fileUploadImageESOP');" />
                                        </div>
                                        <a id="aUserAvatarImageUploadedESOP" href="#" target="_blank">
                                            <img src="../assets/images/arrow-download-icon.png" style="width: 30px; height: 30px;" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="btnSubmitBenpos" type="submit" data-target="#modalBenposUploadConfirmation" data-toggle="modal" class="btn btn-outline dark" >Submit</button>
                    <button id="btnCancelBenpos" type="button" class="btn default" data-dismiss="modal" onclick="javascript:fnClearBenposForm();">Cancel</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

      <div class="modal fade in" id="modalBenposUploadConfirmation" tabindex="-1" role="dialog" aria-hidden="True" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 50%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="True"></button>
                    <h4 class="modal-title"><b>This will create a Non-Compliance Task to users. Are you sure you want to upload the benpos file.?</b></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn dark btn-outline" data-toggle="modal" data-target="#modalBenposUploadConfirmation">NO</button>
                    <input value="YES" id="btnUploadBenposConfirmation" data-dismiss="modal" data-target="#modalBenposUploadTwiceConfirmation" data-toggle="modal" class="btn red"  type="submit" />
                </div>
            </div>
        </div>
    </div>

        <div class="modal fade in" id="modalBenposUploadTwiceConfirmation" tabindex="-1" role="dialog" aria-hidden="True" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 50%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="True"></button>
                    <h4 class="modal-title"><b>This action once done can't be revoke. Are you sure you want to continue?</b></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn dark btn-outline" data-toggle="modal" data-target="#modalBenposUploadTwiceConfirmation">NO</button>
                    <input value="YES" id="btnUploadBenposTwiceConfirmation" data-dismiss="modal" class="btn red" type="submit" onclick="javascript:fnSubmitBenposFile();" />
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="lstNonCompliantTask" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" style="width: 85%">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                    <h4 class="modal-title">Non Compliant Task</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form">
                        <div class="form-body" style="overflow: auto;">
                            <table class="table table-striped table-hover display text-nowrap table-bordered" id="tbl-benposReport-setup">
                                <thead>
                                    <tr>
                                        <th>User Login</th>
                                        <%--  <th>User Email</th>--%>
                                        <th>User Name</th>
                                        <th>Relative Name</th>
                                        <th>Pan</th>
                                        <th>Folio No</th>
                                        <th>Is Folio No. Declared</th>
                                        <th>Difference in No. Of Shares(Absolute Diff (Holding At Declaration - Holding At Benpos))</th>
                                        <%--  <th>Value</th>--%>
                                        <th>No of Shares as per Benpos</th>
                                        <th>No of Shares as per Initial Holding</th>
                                        <th>Is Non Compliant?</th>
                                    </tr>
                                </thead>
                                <tbody id="tbdNonCompliantTaskList">
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <%--<button id="" type="submit" style="background-color:lightgreen" class="btn btn-green" onclick="javascript:fnSendEmailForNC();">Submit</button>--%>
                    <button id="" type="button" class="btn default" data-dismiss="modal">Cancel</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

    <script src="../assets/global/scripts/datatable.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
    <script src="../assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
    <script src="js/Global.js?<%=DateTime.Now %>" type="text/javascript"></script>
    <script src="js/Benpos.js?<%=DateTime.Now %>" type="text/javascript"></script>
</asp:Content>

