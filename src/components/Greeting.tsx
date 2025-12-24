// วิธีที่ 1: กำหนด Interface แยก
interface GreetingProps {
    name: string;
    age?: number;  // Optional prop
}

function Greeting({ name, age }: GreetingProps) {
    return (
        <div>
            <h2>Hello, {name}!</h2>
            {age && <p>You are {age} years old.</p>}
        </div>
    );
}

// วิธีที่ 2: กำหนด inline
function Greeting2({ name, age }: { name: string; age?: number }) {
    return (
        <div>
            <h2>Hello, {name}!</h2>
        </div>
    );
}

export default Greeting;