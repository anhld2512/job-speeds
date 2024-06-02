<template>
    <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-4">About Us</h1>
        <p class="mb-8">Learn more about our company and team. If you have any questions, feel free to reach out to us!
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6 border border-1 border-primary">
                <h2 class="text-xl font-semibold mb-4">Our Story</h2>
                <p class="mb-4">Job Speeds is a leading online platform connecting job seekers with employers. We strive
                    to make the job search process efficient and effective for both parties.</p>
                <p class="mb-4">Our mission is to provide innovative solutions for recruitment and job hunting,
                    leveraging the latest technologies to match the right talent with the right opportunities.</p>
                <p class="mb-4">At Job Speeds, we are committed to creating a positive impact on the job market,
                    empowering individuals and businesses to succeed.</p>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 border border-1 border-primary">
                <h2 class="text-xl font-semibold mb-4">Our Team</h2>
                <div class="grid grid-cols-1 gap-8 ">
                    <div class="bg-white rounded-lg shadow-md p-4 flex items-center border border-1">
                        <img src="https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/427960910_907649657494774_2109471713123594850_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ufAoTHPF2QMQ7kNvgHsXZJK&_nc_ht=scontent.fdad3-5.fna&oh=00_AYCMMyozdOVctQmmxFRTc2x2fe59XbXNerq0HoknwibN8Q&oe=66620678"
                            alt="Avatar" class="w-16 h-16 rounded-full mr-4">
                        <div>
                            <p class="font-bold text-primary">AnhLD</p>
                            <p class="font-semibold">Web And Mobile Developer</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-4 flex items-center border border-1">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="Avatar" class="w-16 h-16 rounded-full mr-4">
                        <div>
                            <p class="font-bold text-primary">QuyenNC</p>
                            <p class="font-semibold">Web Developer</p>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-4 flex items-center border border-1">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="Avatar" class="w-16 h-16 rounded-full mr-4">
                        <div>
                            <p class="font-bold text-primary">Tanya</p>
                            <p class="font-semibold">Social Publicer</p>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
    <div class="container mx-auto py-8">
        <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
        <p class="mb-8">Have a question or feedback? We're here to help. Fill out the form below and we'll get back to
            you as soon as possible.</p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-md p-6 border border-1 border-primary">
                <h2 class="text-xl font-semibold mb-4">Send us a message</h2>
                <form>
                    <div class="mb-4">
                        <input type="text" id="name" name="name" placeholder="Your Name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring focus:ring-primary">
                    </div>
                    <div class="mb-4">
                        <input type="email" id="email" name="email" placeholder="Your Email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring focus:ring-primary">
                    </div>
                    <div class="mb-4">
                        <textarea id="message" name="message" placeholder="Your Message" rows="4"
                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary focus:ring focus:ring-primary"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-full">Send Message</button>
                </form>
            </div>
            <div class="bg-white rounded-lg shadow-md p-6 border border-1 border-primary">
                <h2 class="text-xl font-semibold mb-4">Contact Information</h2>
                <ul class="list-none">
                    <li class="mb-2">
                        <span class="font-semibold">Email:</span> info@jobspeeds.com
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Phone:</span> 09318.666.98
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Address:</span> 99 TTN06, TTN, Q.12 TP.HCM
                    </li>
                </ul>
            </div>
            <!-- <div class="bg-white rounded-lg shadow-md p-6 border border-1 border-primary">
                <h2 class="text-xl font-semibold mb-4">Our Location</h2>
                <p>Visit us at our office for a personal consultation.</p>
                <p>99 TTN06, TTN, Q.12 TP.HCM</p>
            </div> -->
        </div>
    </div>
</template>

<script setup>
// No script setup logic is required for this component
</script>

<style>
/* Add any custom styles here */
</style>