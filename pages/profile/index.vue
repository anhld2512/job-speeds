<template>
    <div class="fixed w-full max-w-6xl flex-row md:flex bg-base-100 z-10 h-auto -mt-4 gap-3">
        <!-- Nội dung bộ lọc -->
        <div class="w-full flex  py-3 items-center justify-end">
            <div class="flex flex-col rounded-xl items-center justify-end border border-2 rounded-lg w-32 min-w-44">
                <div class="form-control">
                    <label class="cursor-pointer label">
                        <span class="flex label-text px-2 text-lg items-center justify-start"><i class="px-1 bi" :class="{'bi-pen text-primary':isEditMode,'bi-ban text-error':!isEditMode}"></i><span>{{isEditMode ? 'Update':'Viewing'}}</span></span>
                        <input type="checkbox" @change="toggleEditMode" class="toggle toggle-primary" :checked="isEditMode" />
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="max-w-6xl mx-auto mt-32 md:mt-14">
        <!-- Avatar and Name -->
        <div class="flex items-center mb-4">
            <div class="w-24 h-24 mr-4">
                <img :src="profile.avatar" alt="Avatar"
                    class="rounded-full w-full h-full object-cover border-4 border-white">
            </div>
            <div>
                <h1 class="text-3xl font-semibold">{{ profile.personalInfo.fullName }}</h1>
                <p class="text-gray-500">{{ profile.professionalInfo.jobTitle }}</p>
            </div>
        </div>

        <!-- Personal Information -->
        <div class="bg-gray-100 p-4 rounded-md mb-4">
            <h2 class="text-lg font-semibold mb-2">Personal Information</h2>
            <ul class="list-disc list-inside">
                <li><span class="font-semibold">Email:</span> {{ profile.personalInfo.email }}</li>
                <li><span class="font-semibold">Phone:</span> {{ profile.personalInfo.phone }}</li>
                <li><span class="font-semibold">Address:</span> {{ profile.personalInfo.address }}</li>
                <li><span class="font-semibold">Date of Birth:</span> {{ profile.personalInfo.dateOfBirth }}</li>
                <li><span class="font-semibold">Gender:</span> {{ profile.personalInfo.gender }}</li>
            </ul>
        </div>

        <!-- Professional Information -->
        <div v-if="isAdmin || isEmployer" class="bg-gray-100 p-4 rounded-md mb-4">
            <h2 class="text-lg font-semibold mb-2">Professional Information</h2>
            <p><span class="font-semibold">Job Title:</span> {{ profile.professionalInfo.jobTitle }}</p>
            <p><span class="font-semibold">Company:</span> {{ profile.professionalInfo.company }}</p>
        </div>

        <!-- Experience -->
        <ProfileExperience v-if="isAdmin || isEmployer" :experience="profile.experience" />

        <!-- Skills -->
        <div v-if="isAdmin || isEmployer" class="bg-gray-100 p-4 rounded-md mb-4">
            <h2 class="text-lg font-semibold mb-2">Skills</h2>
            <div class="flex flex-wrap gap-2">
                <span v-for="skill in profile.skills" :key="skill.name"
                    class="bg-blue-500 text-white px-2 py-1 rounded-full">{{ skill.name }}</span>
            </div>
        </div>

        <!-- Education -->
        <ProfileEducation v-if="isAdmin || isEmployer" :education="profile.education" />

        <!-- Certifications -->
        <ProfileCertifications v-if="isAdmin || isEmployer" :certifications="profile.certifications" />
    </div>
</template>

<script setup>
const isEditMode = ref(false)
const toggleEditMode = () =>{
    isEditMode.value =  !isEditMode.value
}
const profile = {
    avatar: 'https://via.placeholder.com/150',
    personalInfo: {
        fullName: 'Nguyễn Văn A',
        email: 'example@example.com',
        phone: '0123456789',
        address: '123 đường ABC, Quận XYZ, TP HCM',
        dateOfBirth: '1990-01-01',
        gender: 'male'
    },
    professionalInfo: {
        jobTitle: 'Software Developer',
        company: 'ABC Company'
    },
    experience: [
        { title: 'Senior Software Engineer', company: 'XYZ Corp', description: 'Worked on various projects...' }
    ],
    skills: [
        { name: 'JavaScript' },
        { name: 'HTML' },
        { name: 'CSS' },
        { name: 'Vue.js' },
        { name: 'React' },
        { name: 'Angular' },
        { name: 'Node.js' },
        { name: 'Express.js' }
    ],
    education: [
        { degree: 'Bachelor of Science in Computer Science', institution: 'University of XYZ', description: 'Studied computer science...' }
    ],
    certifications: [
        { name: 'AWS Certified Developer - Associate', organization: 'Amazon Web Services' }
    ]
};

const isAdmin = true; // Example, change to false for non-admin user
const isCompany = true; // Example, change to false for non-company user
const isEmployer = true; // Example, change to false for non-employer user

const router = useRouter();
const { token, logout } = useAuth();
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            if (!token) {
                router.push('/login');
            }
        }, 1);
    });
})
</script>