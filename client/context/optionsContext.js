import React, { useState, useEffect } from "react";
export const OptionsContext = React.createContext();

export default function OptionsContextProvider ({ children })  {
  const [selectedBrands, updateSelectBrands] = useState({});
  const [selectedActions, updateSelectActions] = useState({});
  const [loadingFilter, updateLoadingFilter] = useState(false);
  const [triggerFilter, updateTriggerFilter] = useState(false);
  const [timerid, updateTimerid] = useState('');

  const onRemove = (type, tag) => {
    if (type === 'brands') {
      const updatedBrands = Object.assign({}, selectedBrands);
      delete updatedBrands[tag.brandid];
      updateSelectBrands(updatedBrands);
      onUpdateFilter();
    }
    else if (type === 'actions_nested') {
      const updatedActions = Object.assign({}, selectedActions);
      delete updatedActions[tag.parent].nestedTags[tag.nestedtagid];
      updateSelectActions(updatedActions);
      onUpdateFilter();
    }
    else {
      const updatedActions= Object.assign({}, selectedActions);
      delete updatedActions[tag.tagInfo.tagid];
      updateSelectActions(updatedActions);
      onUpdateFilter();
    }
  }

  // introduce a manual delay if many filters are clicked at once, preventing extra requests
  const onUpdateFilter = () => {
    updateLoadingFilter(true);
    if (timerid) clearTimeout(timerid);
    const newTimer = setTimeout(function () {
      updateTriggerFilter(true);
    }, 1000);
    updateTimerid(newTimer);
  }

  const onReset = () => {
    updateTimerid('');
    updateLoadingFilter(false);
    updateTriggerFilter(false);
  }

  return (
    <OptionsContext.Provider
      value={{
        loadingFilter,
        selectedBrands,
        selectedActions,
        triggerFilter,
        updateSelectBrands,
        updateSelectActions,
        onUpdateFilter,
        onRemove,
        onReset
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
}
