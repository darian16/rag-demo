import React, { useEffect } from 'react';
import help from "assets/images/help.svg";
import DemoTooltip from "ui-component/DemoTooltip";
//---------------------------------------------------------------

const Help = ({sendQuery}) => {
  useEffect(() => {
    const handleClick = (event) => {
      let target = event.target;

      if (!(target.classList && target.classList.contains('link-query'))) {
        return;
      }

      sendQuery(target.textContent);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [sendQuery]);

  const tooltipContent = `
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
        <li class='link-query'>What are the differences between declarations for UK and EU trades?</li>
        <li class='link-query'>Is it possible to declare empty containers?</li>
        <li class='link-query'>What are the time limits for lodging export declaration?</li>
        <li class='link-query'>What is the Windsor Framework?</li>
        <li class='link-query'>Give me the differences between manifests for ships departing to any country and to another EU country.</li>
        <li class='link-query'>What is the time limit for rail traffic?</li>
      </ul>
    </p>
  `;

  return (
    <React.Fragment>
      <div id="help">
        <img 
          src={help} 
          alt="Help" 
          width="100" 
          data-tooltip-id="help-tooltip" 
          data-tooltip-html={tooltipContent}
        />
      </div>

      <DemoTooltip id="help-tooltip" clickable={true} />
    </React.Fragment>
  );
};
//---------------------------------------------------------------

export default Help;
//---------------------------------------------------------------
