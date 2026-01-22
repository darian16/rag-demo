import React from 'react';
import help from "assets/images/help.svg";
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const Help = () => {
  return (
    <React.Fragment>
      <div id="help">
        <img src={help} alt="Help" width="100" data-tooltip-id="help-tooltip" data-tooltip-html="<b>This demonstration is limited to information from two source documents:</b><ul><li>Customs Export Procedures Manual.</li><li>Customs Import Procedures Manual.</li></ul>Please note that responses are generated from these documents only and should be verified for accuracy.<br/><p style='margin: 0; margin-top: 7px;'>When referencing specific pages, the page numbers correspond to both the PDF viewer and the printed document numbers.</p><p>FAQ:<ul><li>Please tell me how to declare the goods.</li>
    <li>Is it possible to declare empy containers?</li>
    <li>What are the time limits for lodging export declaration?</li></ul></p>" />
      </div>

      <DemoTooltip id="help-tooltip" />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default Help;
//---------------------------------------------------------------
