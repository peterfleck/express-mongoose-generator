import React, { useState, useEffect } from "react";
import { TextField, Toggle, PrimaryButton } from "@fluentui/react";
import PageHeader from "Shared/components/pageHeader/pageHeader.jsx";
import { useBoolean } from "@uifabric/react-hooks";
import { Grid } from "Shared/components/Grid/Grid.jsx";
import { Panel } from "Shared/components/Panel/Panel.jsx";
import NitecShimmer from "Shared/components/NitecShimmer/NitecShimmer.jsx";
import {
  addNew,
  edit,
  save,
  handleChange,
  deleteRow,
} from "Shared/services/apiCalls.jsx";
import { doAjax } from "~/adalConfig.js";

export default function Operators() {
  const [operators, setOperators] = useState({
    loaded: false,
    operators: [],
    blank: {},
  });
  const [formData, setFormData] = useState({});
  const [panelTitle, setPanelTitle] = useState("");
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(
    false
  );
  const [isNew, { setTrue: setNew, setFalse: setEdit }] = useBoolean(false);
  const gridHeaders = [
    { headerName: "First Name", field: "firstName" },
    { headerName: "Surname", field: "surname" },
    { headerName: "Notes", field: "notes" },
  ];
  const requiredFields = [
    { field: "firstName", name: "First Name" },
    { field: "surname", name: "Surname" },
  ];
  const apiUrls = {
    new: "/Management/Operator/AddOperator",
    get: "/Management/Operator/GetListofOperators",
    update: "/Management/Operator/UpdateOperator",
    delete: "/Management/Operator/DeleteOperator",
  };

  let getTableData = () => {
    setOperators({ loaded: false, operators: [], blank: {} });
    doAjax({
      method: "GET",
      url: apiUrls.get,
    }).then((rtn) => {
      setOperators({
        loaded: true,
        operators: rtn.data.operators,
        blank: rtn.data.newClass,
      });
    });
  };

  useEffect(() => {
    getTableData();
  }, []);

  return (
    <>
      <PageHeader title="Operators" />

      <div align="right">
        <PrimaryButton
          text="Add New"
          onClick={() =>
            addNew(
              setPanelTitle,
              setFormData,
              setNew,
              openPanel,
              operators.blank
            )
          }
        />
      </div>

      {operators.loaded == true ? (
        <Grid
          data={operators.operators}
          columnDefs={gridHeaders}
          edit={(data) =>
            edit(setPanelTitle, setFormData, setEdit, openPanel, data)
          }
          deleteRow={(data) =>
            deleteRow(data.operatorId, apiUrls.delete, getTableData)
          }
        />
      ) : (
        <NitecShimmer />
      )}
      {isOpen === true && (
        <Panel
          panelTitle={panelTitle}
          isOpen={isOpen}
          save={() =>
            save(
              apiUrls,
              isNew,
              formData,
              dismissPanel,
              getTableData,
              requiredFields
            )
          }
          dismissPanel={() => {
            dismissPanel();
          }}
        >
          <TextField
            label="First Name"
            required={true}
            id="firstname"
            value={formData ? formData.firstName : null}
            onChange={(e, value) =>
              handleChange(setFormData, formData, "firstName", value)
            }
          />
        </Panel>
      )}
    </>
  );
}