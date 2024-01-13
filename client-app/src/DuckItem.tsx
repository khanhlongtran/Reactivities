import { Duck } from './demo'

// Interface là alias nhưng cho Object. Trong Object Props có thuộc tính duck ứng với data type là Duck (cũng là interface, là alias cho object)
interface Props {
    duck: Duck,
    // duck2: Duck
}

// indicate that func can receive value duck có kiểu là props
// Cach 1: Sử dụng destructuring, phân giải thằng props ra
export default function DuckItem({ duck }: Props) {
    return (
        <div>
            <span>{duck.name}</span>
            <button onClick={() => duck.makeSound(duck.name + ' quack')}>Make sound</button>
        </div>
    )
}

// Cach 2: truyền vào Props bình thường
// DuckItem nhận vào interface là Props (trong props bao gồm duck and duck2 => DuckItem phải truyền đủ duck={} duck2={})
// Vì component DuckItem muốn nhận vào kiểu Props, mà trong Props thì có ví dụ 3 kiểu khác, thì pass vào thì phải pass đủ 3 kiểu đó
// export default function DuckItem(props: Props) {
//     return (
//         <div>
//             <span>{props.duck.name}</span>
//             <button onClick={() => props.duck.makeSound(props.duck.name + ' quack')}>Make sound</button>
//         </div>
//     )
// }