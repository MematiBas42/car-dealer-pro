"use client"
import { AwaitedPageProps } from '@/config/types';
import React, { ChangeEvent } from 'react'
import { Select } from '../ui/select';

interface TaxonomyFiltersProps extends AwaitedPageProps {
    handleChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    
}
const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
    const {searchParams, ...rest} = props
  return (
    <>
    <Select label='Make' 
        name='make'
        value={searchParams?.make as string || ""}
        options = {[]}
        onChange={() => {}}
    />
    </>
  )
}

export default TaxonomyFilters
