import { useState } from 'react';

import Select from 'react-select';

const Checkbox = ({ children }) => {
  <label style={{ marginRight: '1em' }}>
    <input type='checkbox' />
    {children}
  </label>;
};

const ReactSelect = () => {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const array = [
    { value: 'A', label: 'A', color: '#00B8D9', isFixed: true },
    { value: 'B', label: 'B', color: '#00B8D9', isFixed: true },
    { value: 'C', label: 'C', color: '#00B8D9', isFixed: true }
  ];

  return (
    <>
      <Select
        className='basic-single'
        classNamePrefix='select'
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name='color'
        options={array}
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em'
        }}
      >
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable(state => !state)}
        >
          Clearable
        </Checkbox>
        <Checkbox
          checked={isSearchable}
          onChange={() => setIsSearchable(state => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled(state => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading(state => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox
          checked={isRtl}
          onChange={() => setIsRtl(state => !state)}
        >
          RTL
        </Checkbox>
      </div>
    </>
  );
};
export default ReactSelect;
