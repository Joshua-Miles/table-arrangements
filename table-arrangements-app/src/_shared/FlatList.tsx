import { PageArray } from "@triframe/ambassador"
import { Pagination } from "@triframe/utils-react"
import { useEffect, useRef } from "react"
import { Box, BoxProps } from '@chakra-ui/react'

type FlatListProps<T> = BoxProps & {
    data: PageArray<T>,
    pagination: Pagination
    render: (item: T) => JSX.Element
}

export function FlatList<T>({ data, pagination, render }: FlatListProps<T>) {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

    })

    return (
        <Box ref={container}>

        </Box>
    )
}
