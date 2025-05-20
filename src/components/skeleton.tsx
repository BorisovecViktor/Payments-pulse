import { Stack, Skeleton as MuiSkeleton } from '@mui/material'

type Props = { rows: number }

export const Skeleton = ({ rows }: Props) => {
  const arr = Array(rows).fill(1)

  return (
    <Stack spacing="1px">
      {arr.map((_item, index) => (
        <MuiSkeleton
          key={index}
          animation="wave"
          variant="rectangular"
          height={33}
        />
      ))}
    </Stack>
  )
}
