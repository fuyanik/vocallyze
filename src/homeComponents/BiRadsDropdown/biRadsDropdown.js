import gV from '../../gV';
import { Link, useNavigate } from 'react-router-dom';
import './biRadsDropdown.css';
import { useEffect, useState } from 'react';

import SelectBodyParts from '../../pages/Forms/components/selectBodyParts';
import ScanType from '../../pages/Forms/components/selectScan';

const BiRadsDropdown = ({ onMouseLeave, top, left }) => {
 

  const navigate = useNavigate();

  return (
    <div
      style={{
        top: top,
        left: left,
      }}
      onMouseLeave={onMouseLeave}
      className='bi-rads-dropdown    z-50'>
      <div className='flex flex-col items-center font-product  gap-3 rounded-full '>
        <SelectBodyParts isOutside={true} />
        <ScanType isOutside={true} />
        <div
          onClick={() => { navigate('/form-new');  }}
          className=' flex items-center justify-center  bg-second hover:bg-prim   duration-500 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl'>
          Get Started
        </div>
      </div>
    </div>
  );
};

export default BiRadsDropdown;
