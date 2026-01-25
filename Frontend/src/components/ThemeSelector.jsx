import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { templates, themeColorPalette } from '../../utils/themes'

const ThemeSelector = ({ open, handleTheme, palette, setIndex, index, templateId, setTemplate }) => {
  const [theme, setTheme] = useState("templates")

  return (
    <div className='bg-white w-[90vw] md:w-[80vw] lg:w-[70vw] p-5 rounded-lg relative flex flex-col gap-2 overflow-y-scroll'>
      <RxCross1 className='absolute top-6 right-6 cursor-pointer' onClick={() => open(false)} />
      <p>Change Theme</p>
      <div className='h-[1px] bg-gray-200 w-full'></div>
      <div>
        <div className='flex gap-3'>
          <button className={theme == "templates" ? 'template-btn-underlined' : "template-btn"} onClick={() => setTheme("templates")}>Templates</button>
          <button className={theme == "colors" ? 'template-btn-underlined' : "template-btn"} onClick={() => setTheme("colors")}>Color Palette</button>
        </div>
      </div>
      {
        theme === "templates" ? 
          <div className='py-5 grid grid-cols-2 w-2/3 gap-x-8 gap-y-5 overflow-y-scroll h-[500px]'>

            {
              templates.length > 0 && templates.map(template => {
                return <div className={templateId== template.id ? 'w-full h-[400px] border border-purple-500 cursor-pointer':'w-full h-[400px] border border-white cursor-pointer' }onClick={() => {handleTheme('template', {id: template.id}); setTemplate(template.id)}}>
                  <img src={template.image} alt="" className='h-full w-full' />
                </div>
              })
            }
          </div>
          :
          
            <div className='py-5 grid grid-cols-2 w-1/2 gap-x-2 gap-y-5 overflow-y-scroll h-[500px]'>
              {
                themeColorPalette.length > 0 && themeColorPalette.map((colorPalette, i) => {
                  return <div className={index === i ? 'w-full h-[100px] rounded-lg flex overflow-hidden border-2 border-purple-500' : 'w-full h-[100px] rounded-lg flex overflow-hidden border-2 border-white hover:border-2 hover:border-purple-500'} onClick={() => {
                    handleTheme('colorPalette', colorPalette);
                    setIndex(i)
                  }}>
                    <div className='w-1/5 h-full' style={{ backgroundColor: colorPalette[1] }}></div>
                    <div className='w-1/5 h-full' style={{ backgroundColor: colorPalette[0] }}></div>
                    <div className='w-1/5 h-full' style={{ backgroundColor: colorPalette[2] }}></div>
                    <div className='w-1/5 h-full' style={{ backgroundColor: colorPalette[3] }}></div>
                    <div className='w-1/5 h-full' style={{ backgroundColor: colorPalette[4] }}></div>
                  </div>
                })
              }
            </div>
      }

    </div>
  )
}

export default ThemeSelector
