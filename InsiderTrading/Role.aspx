﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/InsiderTrading/InsiderTradingMaster.Master" CodeBehind="Role.aspx.cs" Inherits="ProcsDLL.InsiderTrading.Role" %>

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
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <%-- ========================= Department List ============================= --%>
    <div class="page-content-inner">
        <div class="row">
            <div class="col-md-12">
                <div class="portlet light portlet-fit ">
                    <div class="portlet-title">
                        <div class="caption">
                            <i class="icon-settings font-red"></i>
                            <span class="caption-subject font-red sbold uppercase">Role List</span>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="table-toolbar">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="btn-group-devided">
                                        <button id="btnAdd" runat="server" class="btn green" onclick="javascript:fnAddRole();" data-target="#stack1" data-toggle="modal">
                                            Add New <i class="fa fa-plus"></i>
                                        </button>
                                        &nbsp;
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table class="table table-striped table-hover table-bordered" id="tbl-Role-setup">
                            <thead>
                                <tr>                                    
                                    <th>ROLE NAME</th>    
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody id="tbdRoleList">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <%-- ========================= Add New Record in Department List ============================= --%>
    <div class="modal fade" id="stack1" tabindex="-1" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="javascript:fnCloseModal();"></button>
                    <h4 class="modal-title">Department SetUp</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4" style="margin-top: 5px;" id="lblRole">Role Name <span class="required"> * </span></div>
                        <div class="col-md-6">
                            <input id="txtRoleName" class="form-control" type="text" autofocus="autofocus"/>
                            <input class="form-control" id="txtRoleKey" type="text" style="display: none;" />
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                    <br />
                    
                  
                    <br />
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-outline dark" onclick="javascript:fnCloseModal();">Close</button>
                    <button id="btnSave" type="button" data-dismiss="modal" class="btn green" onclick="javascript:fnSaveRole();">Save</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
     <div class="modal fade in" id="deleteProduct" tabindex="-1" role="dialog" aria-hidden="True" ">
            <div class="modal-dialog">
                <div class="modal-content" style="margin-top:150px;">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="True"></button>
                        <h4 class="modal-title"><b>Are you sure, you want to delete ?</b></h4>
                    </div>
                    <div class="modal-footer">
                        <input  id="txtDlKey" type="hidden" value="0" />
                        <button type="button" class="btn dark btn-outline" data-dismiss="modal">NO</button>
                        <input  value="YES" id="btnDeleteConfirm" data-dismiss="modal" class="btn red" onclick="DeleteRole()" type="submit" />
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
    <%--Start Datetime--%>
    <script src="../assets/editor/jquery-te-1.4.0.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
    <script src="../assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
   <%-- <script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>--%>
    <%--End Datetime--%>
    <script src="../assets/global/scripts/datatable.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
    <%--<script src="assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>--%>
    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
    <script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <script src="../assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
    <%--<script src="../assets/pages/scripts/table-datatables-buttons.min.js" type="text/javascript"></script>--%>
    <script src="../assets/global/plugins/select2/js/select2.min.js" type="text/javascript"></script>
    <script src="js/Global.js"></script>
     <script src="js/Role.js"></script>
</asp:Content>

