export default function formEventParser<T = Record<string, number | string | Date | boolean>>(e: React.FormEvent): T {
    const form = e.target as HTMLFormElement;
    let formData = {};

    for (const element of form.elements) {
        const input = element as HTMLInputElement;
        const name = input.getAttribute('name');
        if (!name) continue;

        const value = input.value;
        if (value)
            formData = {...formData, [name]: value}
    }

    return formData as T;
}