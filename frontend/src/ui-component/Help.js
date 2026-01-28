import React from 'react';
import help from "assets/images/help.svg";
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const Help = () => {
  return (
    <React.Fragment>
      <div id="help">
        <img src={help} alt="Help" width="100" data-tooltip-id="help-tooltip" 
        data-tooltip-html="
          <b>This demonstration is limited to information from two source documents:</b>
          <ul>
            <li><a title='Go to Customs Import Procedures Manual' target='_blank' href='https://www.revenue.ie/en/tax-professionals/tdm/customs/import-export-policy/customs-import-procedures-manual.pdf'>Customs Import Procedures Manual.</a></li>
            <li><a title='Go to Customs Export Procedures Manual' target='_blank' href='https://www.revenue.ie/en/tax-professionals/tdm/customs/import-export-policy/customs-export-procedures-manual.pdf'>Customs Export Procedures Manual.</a></li>
          </ul>

          Please note that responses are generated from these documents only and should be verified for accuracy.
          <br/>
          <p style='margin: 0; margin-top: 7px;'>When referencing specific pages, the page numbers correspond to both the PDF viewer and the printed document numbers.</p>
          <p>
            Sample of queries:
            <ul>
              <li>Please tell me how to declare the goods.</li>
              <li>Is it possible to declare empy containers?</li>
              <li>What are the time limits for lodging export declaration?</li>
              <li>What is the Windsor Framework?</li>
              <li>Give me the differences between manifests for ships departing to any country and to another EU country.</li>
            </ul>
          </p>" 
        />
      </div>

      <DemoTooltip id="help-tooltip" clickable={true} />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default Help;
//---------------------------------------------------------------
