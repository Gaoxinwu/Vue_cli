<template>
    <div>
        <ul>
            <itemli text='111111' />
            <itemli text='pppppppppppppppp'></itemli>
        </ul>
    </div>
</template>
<script>
import item2 from '@/components/ItemTemplate.vue'
    export default{
        components:{
            itemli:item2
        }
    }
</script>