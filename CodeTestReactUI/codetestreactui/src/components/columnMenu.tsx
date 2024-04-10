
import * as React from 'react';
import {
    GridColumnMenuSort,
    GridColumnMenuFilter,
    GridColumnMenuProps,
} from '@progress/kendo-react-grid';

export const ColumnMenu = (props: GridColumnMenuProps) => {
    return (
      <div>
        <GridColumnMenuSort {...props} />
        <GridColumnMenuFilter {...props} />
      </div>
    );
}
