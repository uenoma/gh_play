import React from "react";
import labels from "../../labels";
import "./DataViewer.css";
import BasicInfoViewer from "./BasicInfoViewer";
import SpecViewer from "./SpecViewer";
import ThrustersViewer from "./ThrustersViewer";
import ReceiveTypesViewer from "./ReceiveTypesViewer";
import GrappleTypesViewer from "./GrappleTypesViewer";
import ShootingTypesViewer from "./ShootingTypesViewer";
import WeaponSpecsViewer from "./WeaponSpecsViewer";
import AvoidanceViewer from "./AvoidanceViewer";
import DefenceViewer from "./DefenceViewer";
import BodyPartViewer from "./BodyPartViewer";
import BodySpecsViewer from "./BodySpecsViewer";
import IconViewer from "./IconViewer";

const DataViewer = ({ data }) => {
  if (!data) return null;

  return (
    <div className="data-viewer">
      <div className="viewer-column">
        <div className="viewer-column">
          <div className="viewer-row">
            <div className="viewer-column avoidance-defence-column">
              <AvoidanceViewer avoidance={data.ms_data.avoidance} />
              <DefenceViewer defence={data.ms_data.defence} />
            </div>
            <ShootingTypesViewer items={data.ms_data.shooting_types} />
            <div className="viewer-spacer10"></div>
            <div className="viewer-column">
              <BasicInfoViewer data={data} />
              <div className="viewer-row grapple-thrusters-row">
                <GrappleTypesViewer items={data.ms_data.grapple_types} />
                <ThrustersViewer items={data.ms_data.thrusters} />
              </div>
            </div>
          </div>
          <div className="viewer-row">
            <BodyPartViewer bodyPart={data.ms_data.body_part} />
            <div className="viewer-spacer10"></div>
            <div className="viewer-spacer10"></div>
            <div className="viewer-spacer10"></div>
            <WeaponSpecsViewer items={data.ms_data.weapon_specs} />
            <ReceiveTypesViewer items={data.ms_data.receive_types} />
            <div className="viewer-spacer10"></div>
            <SpecViewer spec={data.ms_data.spec} />
            <IconViewer msIcon={data.ms_icon} />
          </div>
        </div>
        <BodySpecsViewer bodySpecs={data.ms_data.body_specs} />
      </div>
    </div>
  );
};

export default DataViewer;
