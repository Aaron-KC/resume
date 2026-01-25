import React from 'react'
import Resume from './Resume'
import { templates } from '../../utils/themes'
import Resume2 from './Resume2'


const DEFAULT_THEME = ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565']
const DEFAULT_TEMPLATE = templates


const TemplateOne = ({theme, resume, preview, thumbnailref, template}) => {
  const templateId = template ? template: DEFAULT_TEMPLATE[1].id;
  switch(templateId) {
    case '01':
      return (
        <Resume2 theme={theme.length > 0 ? theme: DEFAULT_THEME} resume={resume} preview={preview} thumbnailref={thumbnailref} template={DEFAULT_TEMPLATE[0]}/>
      )
    default:
      return (
      <Resume theme={theme.length > 0 ? theme: DEFAULT_THEME} resume={resume} preview={preview} thumbnailref={thumbnailref} template={DEFAULT_TEMPLATE[1]}/>

      )
  }
}

export default TemplateOne
