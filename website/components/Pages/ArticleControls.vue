<template>
	<Row>
		<div class="controls">
			<prismic-link
				v-for="(item, index) in slice.items"
				:key="'item-' + index"
				:field="item.link"
				:class="{next: item.link_direction, previous: !item.link_direction}"
			>{{ item.link_label }}</prismic-link>
		</div>
	</Row>
</template>

<script>
import Row from '@/components/Row'

export default {
	name: 'ArticleControls',
	components: {
		Row
	},
	props: {
		slice: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>


.controls {
	display: block;
	width: 100%;
}
.previous {
	float: left;
	&::before {
		content: '\0000AB';
	}
}
.next {
	float: right;
	margin-left: auto;
	&::after {
		content: '\0000BB';
	}
}
</style>
