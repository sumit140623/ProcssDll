﻿<%@ Page Title="Connected Person Trading Report" Language="C#" MasterPageFile="~/InsiderTrading/InsiderTradingMaster.Master" AutoEventWireup="true" CodeBehind="TradingReportsCP.aspx.cs" Inherits="ProcsDLL.InsiderTrading.TradingReportsCP" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <%--start date --%>
    <link href="../assets/global/css/components.min.css" rel="stylesheet" />
    <link href="../assets/global/css/plugins.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet" />
    <link href="../assets/global/plugins/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" />
    <%--End date --%>
    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/global/plugins/select2/css/select2-bootstrap.min.css" rel="stylesheet" type="text/css" />
    <style>
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
    <div class="col-md-12">
        <!-- BEGIN Portlet PORTLET-->
        <div class="portlet light portlet-fit ">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-settings font-red"></i>
                    <span class="caption-subject font-red sbold uppercase">Connected Person Trading Report</span>
                </div>
            </div>

            <div class="portlet-body">
                <div class="row">
                    <div class="col-md-3">

                        <label for="ddUserType" style="text-align: center; display: block;">User Type</label>
                        <select class="form-control" name="Company" id="ddUserType">
                            <option disabled="disabled" selected="selected" value="">Select</option>
                            <option value="Connected_Person">Connected Person</option>
                            <option value="UPSI_Member">UPSI Member</option>
                        </select>

                    </div>
                    <div class="col-md-3">
                        <label for="from_date" style="text-align: center; display: block;">From</label>
                        <input id="txtFromDate" data-date-format="dd/mm/yyyy" type="text" class="form-control date-picker" name="from_date" autocomplete="off" />
                    </div>
                    <div class="col-md-3">
                        <label for="to_date" style="text-align: center; display: block;">To</label>
                        <input id="txtToDate" data-date-format="dd/mm/yyyy" type="text" class="form-control date-picker" name="to_date" autocomplete="off" />
                    </div>
                    <div class="col-md-3">
                        <label>&nbsp;</label>
                        <input id="txtGetTadingReport" type="button" style="background-color: limegreen;" class="form-control" value="Run" onclick="fnGetTradingReport();" />
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />
                    <div class="col-md-12">
                        <table class="table table-striped table-hover display text-nowrap table-bordered" id="tbl-CPtradeReport-setup">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>PAN</th>
                                    <th>Benpos Date</th>
                                    <th>Holding</th>
                                </tr>

                            </thead>
                            <tbody id="tbdCPTradeReportList"></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- END Portlet PORTLET-->
        </div>
    </div>
    <%--Start Datetime--%>
    <script src="../assets/editor/jquery-te-1.4.0.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/global/plugins/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
    <script src="../assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
    <%--End Datetime--%>

    <script src="../assets/global/scripts/datatable.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/datatables.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js" type="text/javascript"></script>
    <script src="../assets/global/scripts/app.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
    <script src="../assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
    <script src="../assets/pages/scripts/components-select2.min.js" type="text/javascript"></script>

    <script src="../assets/global/plugins/flot/jquery.flot.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/flot/jquery.flot.resize.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/flot/jquery.flot.categories.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/flot/jquery.flot.pie.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/flot/jquery.flot.stack.min.js" type="text/javascript"></script>
    <script src="../assets/global/plugins/flot/jquery.flot.crosshair.min.js" type="text/javascript"></script>
    <script src="js/Global.js?<%=DateTime.Now %>" type="text/javascript"></script>
    <script src="js/TradingReportConnectedPerson.js?<%=DateTime.Now %>" type="text/javascript"></script>
</asp:Content>